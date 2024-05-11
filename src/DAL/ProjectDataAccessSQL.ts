import pool from "../../db";
import Project from "../models/Project";
import { DataAccess } from "./DataAccess";

export class ProjectDataAccessSQL implements DataAccess<Project> {
  getUserByEmail(email: string): Promise<Project> {
    throw new Error("Method not implemented.");
  }
  async add(project: Project): Promise<void> {
    const query =
      "INSERT INTO project (project_name, project_details, sub_projects, roles, created_at, due_date, percent, posted_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
    await pool.query(query, [
      project.project_name,
      project.project_details,
      JSON.stringify(project.sub_projects),
      JSON.stringify(project.roles),
      project.created_at.toISOString(),
      project.due_date.toISOString(),
      project.percent,
      project.posted_by,
    ]);
  }

  async getAll(text?: string, from?: Number, to?: Number): Promise<Project[]> {
    const query = "SELECT * FROM project";
    const queryFilter =
      "SELECT * FROM project WHERE (project_name ILIKE $1 or project_details ILIKE $1)";
    const queryPageing = "SELECT * FROM project ORDER BY id LIMIT $2 OFFSET $1";
    const queryPageingAndFilter =
      "SELECT * FROM project WHERE (project_name ILIKE $1 or project_details ILIKE $1) ORDER BY id LIMIT $3 OFFSET $2";
    let result = await pool.query(query);
    if (result.rows.length === 0) {
      throw new Error(`No projects`);
    }
    if (text && (from || to)) {
      result = await pool.query(queryPageingAndFilter, [`%${text}%`, from, to]);
    }

    // Paging
    if ((from || to) && !text) {
      if (from === undefined || to === undefined) {
        throw new Error("from and to must both be defined for paging");
      }

      result = await pool.query(queryPageing, [from, to]);
    }

    // filtering
    if (text && !(from || to)) {
      result = await pool.query(queryFilter, [`%${text}%`]);
    }

    if (result.rows.length === 0) {
      throw new Error(`No projects found`);
    }

    return result.rows;
  }

  async get(projectId: number): Promise<Project> {
    const query = "SELECT * FROM project WHERE id = $1";
    const result = await pool.query(query, [projectId]);

    if (result.rows.length === 0) {
      throw new Error(`Project with ID ${projectId} not found`);
    }

    return result.rows[0];
  }

  async update(projectId: number, updateData: Partial<Project>): Promise<void> {
    let query = "UPDATE project SET ";
    const updates: string[] = [];
    const values: (string | number)[] = [];

    Object.entries(updateData).forEach(([key, value], index) => {
      if (key === "sub_projects" || key === "roles") {
        value = JSON.stringify(value);
      }
      if (key === "created_at" || key === "due_date") {
        if (typeof value === "string" && Date.parse(value)) {
          value = new Date(value).toISOString();
        } else {
          throw new Error("Invalid date format");
        }
      }
      updates.push(`${key} = $${index + 1}`);
      values.push(value.toString());
    });

    query += updates.join(", ") + " WHERE id = $" + (values.length + 1);
    values.push(projectId.toString());

    await pool.query(query, values);
  }

  async delete(projectId: number): Promise<void> {
    const query = "DELETE FROM project WHERE id = $1";
    const result = await pool.query(query, [projectId]);
    if (result.rowCount === 0) {
      throw new Error(`Project with ID ${projectId} not found`);
    }
  }
}
