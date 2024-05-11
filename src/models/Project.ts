import { SubProject } from "./NewTypes/SubProjectType";
import { Role } from "./NewTypes/RoleType";

class Project {
  id: number;
  project_name: string;
  project_details: string;
  sub_projects: Array<SubProject>;
  roles: Array<Role>;
  created_at: Date;
  due_date: Date;
  percent: number;
  posted_by: number;

  constructor(
    id: number,
    project_name: string,
    project_details: string,
    sub_projects: Array<SubProject>,
    roles: Array<Role>,
    created_at: string,
    due_date: string,
    percent: number,
    posted_by: number
  ) {
    this.id = id;
    this.project_name = project_name;
    this.project_details = project_details;
    this.sub_projects = sub_projects;
    this.roles = roles;
    this.created_at = new Date(created_at);
    this.due_date = new Date(due_date);
    this.percent = percent;
    this.posted_by = posted_by;
  }
}
export default Project;
