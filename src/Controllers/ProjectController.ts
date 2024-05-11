import { Request, Response } from "express";
import Project from "../models/Project";
import { ProjectBL } from "../BL/ProjectBL";

export class ProjectController {
  private projectBL: ProjectBL;

  constructor(projectBL: ProjectBL) {
    this.projectBL = projectBL;
  }

  async addProject(req: Request, res: Response): Promise<void> {
    const projectData = req.body;
    const project = new Project(
      projectData.id,
      projectData.project_name,
      projectData.project_details,
      projectData.sub_projects,
      projectData.roles,
      projectData.created_at,
      projectData.due_date,
      projectData.percent,
      projectData.posted_by
    );
    try {
      await this.projectBL.addProject(project);
      res.status(201).send({ message: `Project created successfully` });
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async getProject(req: Request, res: Response): Promise<void> {
    const projectID = +req.params.id;
    try {
      const project = await this.projectBL.getProject(projectID);
      res.status(200).send(project);
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async getAllProjects(req: Request, res: Response): Promise<void> {
    const text = req.query.text as string;
    const from = parseInt(req.query.from as string);
    const to = parseInt(req.query.to as string);
    try {
      const Projects = await this.projectBL.getAllProjects(text, from, to);
      res.status(200).send(Projects);
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async updateProject(req: Request, res: Response): Promise<void> {
    const projectID = +req.params.id;
    const projectData = req.body;
    try {
      await this.projectBL.updateProject(projectID, projectData);
      res
        .status(200)
        .send({ message: `Project ${projectID} updated successfully` });
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async deleteProject(req: Request, res: Response): Promise<void> {
    const projectID = +req.params.id;
    try {
      await this.projectBL.deleteProject(projectID);
      res
        .status(200)
        .send({ message: `Project ${projectID} deleted successfully` });
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }
}
