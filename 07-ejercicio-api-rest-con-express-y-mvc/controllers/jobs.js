import { JobModel } from "../models/jobs.js";
import { DEFAULTS } from "../config.js";

export class JobController {
  static getAll(req, res) {
    console.log("query:", req.query);
    const {
      title,
      text,
      technology,
      limit = DEFAULTS.LIMIT_PAGINATION,
      offset = DEFAULTS.LIMIT_OFFSET,
    } = req.query;
    console.log("limit:", limit, "offset:", offset);
    const result = JobModel.getAll({ title, text, technology, limit, offset });
    res.json(result);
  }

  static getById(req, res) {
    const { id } = req.params;
    const job = JobModel.getById(id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  }

  static create(req, res) {
    const newJob = JobModel.create(req.body);
    res.status(201).json(newJob);
  }

  static update(req, res) {
    const job = JobModel.update(req.params.id, req.body);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  }

  static patch(req, res) {
    const job = JobModel.patch(req.params.id, req.body);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  }

  static delete(req, res) {
    const result = JobModel.delete(req.params.id);
    if (!result) return res.status(404).json({ error: "Job not found" });
    res.json({ message: "Job deleted" });
  }
}
