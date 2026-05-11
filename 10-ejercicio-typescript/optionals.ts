import type { Job, ExperienceLevel, Technology, WorkMode } from "./objects.ts";
import {
  searchJobs,
  filterByExperience,
  filterByTechnology,
  filterByMinSalary,
} from "./functions.ts";

export function advancedSearch(
  jobs: Job[],
  options: {
    text?: string;
    level?: ExperienceLevel;
    technology?: Technology;
    minSalary?: number;
    workMode?: WorkMode;
  },
): Job[] {
  let results = jobs;

  if (options.text) {
    results = searchJobs(results, options.text);
  }

  if (options.level) {
    results = filterByExperience(results, options.level);
  }

  if (options.technology) {
    results = filterByTechnology(results, options.technology);
  }

  if (options.minSalary) {
    results = filterByMinSalary(results, options.minSalary);
  }

  if (options.workMode) {
    results = results.filter((job) => job.workMode === options.workMode);
  }

  return results;
}

export function getRecentJobs(jobs: Job[], days: number = 30): Job[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return jobs.filter((job) => job.postedDate >= cutoffDate);
}
