import type { Job } from "./objects.ts";
import { searchJobs } from "./functions.ts";

export type SearchResult =
  | { success: true; jobs: Job[]; count: number }
  | { success: false; error: string };

export function safeSearch(jobs: Job[], searchTerm: string): SearchResult {
  if (!searchTerm || searchTerm.trim().length === 0) {
    return {
      success: false,
      error: "El término de búsqueda no puede estar vacío",
    };
  }

  const results = searchJobs(jobs, searchTerm);

  return {
    success: true,
    jobs: results,
    count: results.length,
  };
}

export function displaySearchResults(result: SearchResult): void {
  if (result.success) {
    console.log(`Encontrados ${result.count} empleos:`);
    result.jobs.forEach((job) => {
      console.log(`- ${job.title} en ${job.company}`);
    });
  } else {
    console.error(`Error: ${result.error}`);
  }
}
