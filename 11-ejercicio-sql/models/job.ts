import crypto from "node:crypto";
import { db } from "../db/database";
import type {
  Job,
  JobData,
  JobContent,
  CreateJobDTO,
  UpdateJobDTO,
  JobFilters,
} from "../types";

interface JobRow {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  modality: JobData["modality"];
  level: JobData["level"];
  technologies: string | null;
  contentDescription: string | null;
  responsibilities: string | null;
  requirements: string | null;
  about: string | null;
}

const SELECT_JOBS = `
  SELECT
    jobs.id,
    jobs.title,
    jobs.company,
    jobs.location,
    jobs.description,
    jobs.modality,
    jobs.level,
    GROUP_CONCAT(job_technologies.technology ORDER BY job_technologies.rowid) AS technologies,
    job_content.description AS contentDescription,
    job_content.responsibilities,
    job_content.requirements,
    job_content.about
  FROM jobs
  LEFT JOIN job_technologies ON job_technologies.job_id = jobs.id
  LEFT JOIN job_content ON job_content.job_id = jobs.id
`;

function mapContent(row: JobRow): JobContent | undefined {
  const { contentDescription, responsibilities, requirements, about } = row;

  if (!contentDescription || !responsibilities || !requirements || !about) {
    return undefined;
  }

  return { description: contentDescription, responsibilities, requirements, about };
}

function mapJob(row: JobRow): Job {
  return {
    id: row.id,
    title: row.title,
    company: row.company,
    location: row.location,
    description: row.description,
    data: {
      technology: row.technologies ? row.technologies.split(",") : [],
      modality: row.modality,
      level: row.level,
    },
    content: mapContent(row),
  };
}

function saveTechnologies(jobId: string, technologies: string[]) {
  const insert = db.prepare(
    "INSERT INTO job_technologies (job_id, technology) VALUES (?, ?)",
  );

  db.prepare("DELETE FROM job_technologies WHERE job_id = ?").run(jobId);
  technologies.forEach((technology) => insert.run(jobId, technology));
}

function saveContent(jobId: string, content: JobContent) {
  db.prepare("DELETE FROM job_content WHERE job_id = ?").run(jobId);
  db.prepare(
    `INSERT INTO job_content (id, job_id, description, responsibilities, requirements, about)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(
    crypto.randomUUID(),
    jobId,
    content.description,
    content.responsibilities,
    content.requirements,
    content.about,
  );
}

export class JobModel {
  static async getAll(filters?: JobFilters): Promise<Job[]> {
    const { tech, modality, level } = filters ?? {};
    const conditions: string[] = [];
    const values: string[] = [];

    if (tech) {
      conditions.push(
        "jobs.id IN (SELECT job_id FROM job_technologies WHERE technology = ?)",
      );
      values.push(tech.toLowerCase());
    }
    if (modality) {
      conditions.push("jobs.modality = ?");
      values.push(modality);
    }
    if (level) {
      conditions.push("jobs.level = ?");
      values.push(level);
    }

    const where = conditions.length ? ` WHERE ${conditions.join(" AND ")}` : "";
    const rows = db
      .prepare(`${SELECT_JOBS}${where} GROUP BY jobs.id`)
      .all(...values) as JobRow[];

    return rows.map(mapJob);
  }

  static async getById(id: string): Promise<Job | undefined> {
    const row = db
      .prepare(`${SELECT_JOBS} WHERE jobs.id = ? GROUP BY jobs.id`)
      .get(id) as JobRow | undefined;

    if (!row) return undefined;

    return mapJob(row);
  }

  static async create(input: CreateJobDTO): Promise<Job> {
    const newJob: Job = {
      id: crypto.randomUUID(),
      ...input,
    };

    const insert = db.transaction(() => {
      db.prepare(
        `INSERT INTO jobs (id, title, company, location, description, modality, level)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ).run(
        newJob.id,
        newJob.title,
        newJob.company,
        newJob.location,
        newJob.description,
        newJob.data.modality,
        newJob.data.level,
      );

      saveTechnologies(newJob.id, newJob.data.technology);
      if (newJob.content) saveContent(newJob.id, newJob.content);
    });

    insert();

    return newJob;
  }

  static async delete(id: string): Promise<boolean> {
    const { changes } = db.prepare("DELETE FROM jobs WHERE id = ?").run(id);

    return changes > 0;
  }

  static async update(id: string, input: UpdateJobDTO): Promise<Job | null> {
    const current = await JobModel.getById(id);

    if (!current) return null;

    const updated: Job = {
      ...current,
      ...input,
      data: { ...current.data, ...input.data },
      content: input.content ?? current.content,
    };

    const save = db.transaction(() => {
      db.prepare(
        `UPDATE jobs
         SET title = ?, company = ?, location = ?, description = ?, modality = ?, level = ?
         WHERE id = ?`,
      ).run(
        updated.title,
        updated.company,
        updated.location,
        updated.description,
        updated.data.modality,
        updated.data.level,
        id,
      );

      saveTechnologies(id, updated.data.technology);
      if (updated.content) saveContent(id, updated.content);
    });

    save();

    return updated;
  }
}
