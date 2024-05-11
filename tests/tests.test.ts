import request from "supertest";
import app from "../index";

describe("Projects routes", () => {
  let createdFakeProjectIdId = 0;
  let createdFakeUserId = 123456789; //test user id in db

  //##################################### 1 - create project ####################
  it("should ADD a new project", async () => {
    const res = await request(app).post("/projects").send({
      project_name: "fake project name",
      project_details: "fake project details",
      sub_projects: [],
      roles: [],
      created_at: "2024-02-26 14:00:00+02:00",
      due_date: "2024-12-26 14:00:00+02",
      percent: 0,
      posted_by: 1,
    });

    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Project created successfully");
  });

  //############# 2 filter (text) & get the id of the fake project ##############
  it("should GET projects filtered by TEXT", async () => {
    const text = "Pro";
    const res = await request(app).get(`/projects?text=${text}`);

    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0].project_name).toBe("fake project name");
    expect(res.body[0].project_details).toBe("fake project details");
    expect(res.body[0].sub_projects).toBe([]);
    expect(res.body[0].roles).toBe([]);
    expect(res.body[0]).toHaveProperty("created_at");
    expect(res.body[0]).toHaveProperty("due_date");
    expect(res.body[0].percent).toBe(0);
    expect(res.body[0].posted_by).toBe(1);

    createdFakeProjectIdId = res.body[0].id;
  });

  //##################################### 3 - get by id ######################
  it("this will GET spesefic project by id=fakeProjectId", async () => {
    const res = await request(app).get(`/projects/${createdFakeProjectIdId}`);
    const fakeProject = res.body;

    expect(res.status).toEqual(200);
    expect(fakeProject.project_name).toBe("fake project name");
    expect(fakeProject.project_details).toBe("fake project details");
    expect(fakeProject.sub_projects).toBe([]);
    expect(fakeProject.roles).toBe([]);
    expect(fakeProject).toHaveProperty("created_at");
    expect(fakeProject).toHaveProperty("due_date");
    expect(fakeProject.percent).toBe(0);
    expect(fakeProject.posted_by).toBe(1);
  });

  //##################################### 4 getall ###########################
  it("this will GET ALL projects", async () => {
    const res = await request(app).get(`/projects/`);
    expect(res.status).toEqual(200);
    const allProjects = res.body;

    const fakeProject = allProjects[0];

    expect(Array.isArray(res.body)).toBe(true);
    expect(fakeProject.project_name).toBe("fake project name");
    expect(fakeProject.project_details).toBe("fake project details");
    expect(fakeProject.sub_projects).toBe([]);
    expect(fakeProject.roles).toBe([]);
    expect(fakeProject).toHaveProperty("created_at");
    expect(fakeProject).toHaveProperty("due_date");
    expect(fakeProject.percent).toBe(0);
    expect(fakeProject.posted_by).toBe(1);
  });

  //##################################### 5 update ###########################
  it("this will UPDATE spesefic project by id", async () => {
    const res = await request(app)
      .put(`/projects/${createdFakeProjectIdId}`)
      .send({
        project_name: "new fake project",
        project_details: "new fake project details",
        sub_projects: [],
        roles: [],
        created_at: "2024-04-26 14:00:00+02:00",
        due_date: "2024-10-26 14:00:00+02",
        percent: 0,
        posted_by: 1,
      });

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe(
      `Project: ${createdFakeProjectIdId} updated successfully`
    );
  });

  //##################################### 6 delete ###########################
  it("this will DELETE spesefic project by id", async () => {
    const res = await request(app).delete(
      `/projects/${createdFakeProjectIdId}`
    );

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe(
      `Project ${createdFakeProjectIdId} deleted successfully`
    );
  });

  //####################################################### USER TESTS #######################################################

  // //##################################### 2 - Get User by ID ######################
  it("should GET user by ID", async () => {
    const res = await request(app).get(`/users/${createdFakeUserId}`);
    const fakeUser = res.body;

    expect(res.status).toEqual(200);
    expect(fakeUser).toHaveProperty("first_name");
    expect(fakeUser).toHaveProperty("surname");
    expect(fakeUser).toHaveProperty("email");
    expect(fakeUser).toHaveProperty("color");
  });

  //##################################### 5 - Get All Users ######################
  it("should GET ALL users", async () => {
    const res = await request(app).get("/users");
    const allUsers = res.body;

    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(allUsers.length).toBeGreaterThan(0);
  });

  //##################################### 4 - Delete User ######################
  it("should DELETE user by ID", async () => {
    const res = await request(app).delete(`/users/${createdFakeUserId}`);

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe(
      `User ${createdFakeUserId} deleted successfully`
    );
  });
});
