import type { Job } from "./objects.ts";

export type Coordinates = [number, number]; // [latitud, longitud]

export type SalaryRange = [number, number]; // [mínimo, máximo]

export function getSalaryRange(jobs: Job[]): SalaryRange {
  const salaries = jobs
    .filter((job) => job.salary !== undefined)
    .map((job) => job.salary as number);

  if (salaries.length === 0) {
    return [0, 0];
  }

  const min = Math.min(...salaries);
  const max = Math.max(...salaries);

  return [min, max];
}
