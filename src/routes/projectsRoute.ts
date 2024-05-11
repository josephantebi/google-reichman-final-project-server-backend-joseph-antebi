import express, { Request, Response } from "express";
import { ProjectController } from "../Controllers/ProjectController";
import { ProjectBL } from "../BL/ProjectBL";
import { ProjectDataAccessSQL } from "../DAL/ProjectDataAccessSQL";

const router = express.Router();
const projectController = new ProjectController(
  new ProjectBL(new ProjectDataAccessSQL())
);

router.post(
  "/",
  async (req: Request, res: Response) =>
    await projectController.addProject(req, res)
);
router.get(
  "/",
  async (req: Request, res: Response) =>
    await projectController.getAllProjects(req, res)
);
router.get(
  "/:id",
  async (req: Request, res: Response) =>
    await projectController.getProject(req, res)
);
router.put(
  "/:id",
  async (req: Request, res: Response) =>
    await projectController.updateProject(req, res)
);
router.delete(
  "/:id",
  async (req: Request, res: Response) =>
    await projectController.deleteProject(req, res)
);

export default router;
