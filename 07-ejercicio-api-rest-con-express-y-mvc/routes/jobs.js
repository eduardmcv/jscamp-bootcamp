import { Router } from "express";
import { JobController } from "../controllers/jobs.js";

export const jobsRouter = Router();

jobsRouter.get("/", JobController.getAll);
jobsRouter.get("/:id", JobController.getById);
jobsRouter.post("/", JobController.create);
jobsRouter.put("/:id", JobController.update);
jobsRouter.patch("/:id", JobController.patch);
jobsRouter.delete("/:id", JobController.delete);
