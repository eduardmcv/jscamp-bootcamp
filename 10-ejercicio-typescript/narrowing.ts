import type { Job, Candidate } from "./objects.ts";

export function isQualified(candidate: Candidate, job: Job): boolean {
  const requiredYears =
    job.experienceLevel === "junior"
      ? 0
      : job.experienceLevel === "mid"
        ? 2
        : job.experienceLevel === "senior"
          ? 5
          : 8;

  if (candidate.experienceYears < requiredYears) {
    return false;
  }

  const hasRequiredSkill = job.technologies.some((tech) =>
    candidate.skills.includes(tech),
  );

  return hasRequiredSkill;
}

export function formatSalary(salary: number | undefined): string {
  if (salary === undefined) {
    return "Salario no especificado";
  }

  return `€${salary.toLocaleString()}`;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
