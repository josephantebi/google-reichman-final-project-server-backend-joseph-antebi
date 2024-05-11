DROP DATABASE IF exists project_manager;
CREATE DATABASE project_manager;
-- Connect to the desired database
\c project_manager;

DROP TABLE IF EXISTS public.project;
CREATE TABLE project
(
    id serial PRIMARY KEY,
    project_name character varying NOT NULL,
    project_details character varying NOT NULL,
    sub_projects jsonb NOT NULL,
    roles json NOT NULL,
    created_at timestamp with time zone NOT NULL,
    due_date timestamp with time zone NOT NULL,
    percent integer,
    posted_by integer
);

INSERT INTO project (project_name, project_details, sub_projects, roles, created_at, due_date, percent, posted_by)
VALUES 
('Project number 1', 'Project number 1 details', '[{"id": 1, "subProjectName": "a", "subProjectRoles": ["A, B, C"], "subProjectPercent": "0"}, {"id": 2, "subProjectName": "b", "subProjectRoles": ["A"], "subProjectPercent": "0"}, {"id": 3, "subProjectName": "c",  "subProjectRoles": ["B"], "subProjectPercent": "0"}]' ,'["A", "B"]', '2024-02-26T12:00:00.000Z', '2024-12-26T12:00:00.000Z', 0, 1);


DROP TABLE IF EXISTS public.user;
CREATE TABLE "user"
(
    id serial NOT NULL PRIMARY KEY,
    first_name character varying NOT NULL,
    surname character varying NOT NULL, 
    email character varying(255) NOT NULL,
    color character varying NOT NULL
);

INSERT INTO "user" (first_name, surname, email, color)
VALUES 
    ('A', 'AA', 'a.aa@gmail.com', '#3b82f6'),
    ('B', 'BB', 'b.bb@gmail.com', '#16a34a');
