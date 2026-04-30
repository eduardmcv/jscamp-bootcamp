import { z } from "zod";

const jobSchema = z.object({
  titulo: z.string().min(3).max(100),
  empresa: z.string(),
  ubicacion: z.string(),
  descripcion: z.string().optional(),
  content: z.any().optional(),
  data: z
    .object({
      technology: z.array(z.string()),
      modalidad: z.string().optional(),
      nivel: z.string().optional(),
    })
    .optional(),
});

export function validateJob(input) {
  return jobSchema.safeParse(input);
}

export function validatePartialJob(input) {
  return jobSchema.partial().safeParse(input);
}
