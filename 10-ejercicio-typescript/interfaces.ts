import type {
  Job,
  ExperienceLevel,
  Technology,
  ApplicationStatus,
} from "./objects.ts";
import {
  filterByExperience,
  filterByMinSalary,
  filterByTechnology,
  searchJobs,
} from "./functions.ts";

export interface JobSearchService {
  searchJobs: (jobs: Job[], searchTerm: string) => Job[];
  filterByExperience: (jobs: Job[], level: ExperienceLevel) => Job[];
  filterByMinSalary: (jobs: Job[], minSalary: number) => Job[];
  filterByTechnology: (jobs: Job[], tech: Technology) => Job[];
}

export const searchService: JobSearchService = {
  searchJobs,
  filterByExperience,
  filterByMinSalary,
  filterByTechnology,
};

export interface JobApplication {
  id: string;
  jobId: string;
  candidateId: string;
  status: ApplicationStatus;
  appliedDate: Date;
  coverLetter?: string;
}

export interface DetailedJob extends Job {
  benefits: string[];
  requirements: string[];
  applicationDeadline?: Date;
}
