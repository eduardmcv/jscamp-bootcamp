import data from "../jobs.json" with { type: "json" };
import { v4 as uuidv4 } from "uuid";

export class JobModel {
  static getAll({ title, text, technology, limit = 10, offset = 0 }) {
    let jobs = data;

    if (title)
      jobs = jobs.filter((job) =>
        job.titulo.toLowerCase().includes(title.toLowerCase()),
      );
    if (text)
      jobs = jobs.filter(
        (job) =>
          job.titulo.toLowerCase().includes(text.toLowerCase()) ||
          job.descripcion.toLowerCase().includes(text.toLowerCase()),
      );
    if (technology)
      jobs = jobs.filter((job) =>
        job.data.technology.includes(technology.toLowerCase()),
      );

    const total = jobs.length;
    const data_paginada = jobs.slice(
      Number(offset),
      Number(offset) + Number(limit),
    );

    return {
      data: data_paginada,
      total,
      limit: Number(limit),
      offset: Number(offset),
    };
  }

  static getById(id) {
    return data.find((job) => job.id === id);
  }

  static create(jobData) {
    const newJob = { id: uuidv4(), ...jobData };
    data.push(newJob);
    return newJob;
  }

  static update(id, jobData) {
    const index = data.findIndex((job) => job.id === id);
    if (index === -1) return null;
    data[index] = { id, ...jobData };
    return data[index];
  }

  static patch(id, jobData) {
    const index = data.findIndex((job) => job.id === id);
    if (index === -1) return null;
    data[index] = { ...data[index], ...jobData };
    return data[index];
  }

  static delete(id) {
    const index = data.findIndex((job) => job.id === id);
    if (index === -1) return null;
    data.splice(index, 1);
    return true;
  }
}
