import type { Job, ExperienceLevel, Technology } from "./objects.ts";

export function filterByExperience(jobs: Job[], level: ExperienceLevel): Job[] {
  return jobs.filter((job) => job.experienceLevel === level);
}

export function filterByTechnology(jobs: Job[], tech: Technology): Job[] {
  return jobs.filter((job) =>
    job.technologies.includes(tech.toLowerCase() as Technology),
  );
}

export function filterByMinSalary(jobs: Job[], minSalary: number): Job[] {
  return jobs.filter(
    (job) => job.salary !== undefined && job.salary >= minSalary,
  );
}

export function searchJobs(jobs: Job[], searchTerm: string): Job[] {
  const term = searchTerm.toLowerCase();
  return jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(term) ||
      job.description.toLowerCase().includes(term),
  );
}
