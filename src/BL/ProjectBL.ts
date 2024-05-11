import { DataAccess } from "../DAL/DataAccess";
import Project from "../models/Project";

export class ProjectBL {
  private projectDataAccess: DataAccess<Project>;

  constructor(projectDataAccess: DataAccess<Project>) {
    this.projectDataAccess = projectDataAccess;
  }

  async addProject(project: Project): Promise<void> {
    try {
      await this.projectDataAccess.add(project);
    } catch (error) {
      throw new Error(`Unable to add Project: ${(error as Error).message}`);
    }
  }

  async getProject(projectId: number): Promise<Project> {
    const Project = await this.projectDataAccess.get(projectId);
    if (!Project) {
      throw new Error(`Project with ID ${projectId} not found`);
    }
    return Project;
  }

  async getAllProjects(
    text?: string,
    from?: Number,
    to?: Number
  ): Promise<Project[]> {
    const Projects = await this.projectDataAccess.getAll(text, from, to);
    if (Projects.length === 0) {
      throw new Error(`Projects not found`);
    }
    return Projects;
  }

  async updateProject(
    projectId: number,
    updateData: Partial<Project>
  ): Promise<void> {
    try {
      await this.projectDataAccess.update(projectId, updateData);
    } catch (error) {
      throw new Error(`Unable to update Project: ${(error as Error).message}`);
    }
  }

  async deleteProject(projectId: number): Promise<void> {
    try {
      await this.projectDataAccess.delete(projectId);
    } catch (error) {
      throw new Error(`Unable to delete Project: ${(error as Error).message}`);
    }
  }
}
