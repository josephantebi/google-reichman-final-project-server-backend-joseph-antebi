import express from "express";
import activityLogger from "./src/middlewares/activityLogger";
// import authRoute from "./src/routes/authRoute";
import usersRoute from "./src/routes/usersRoute";
// import rolesRoute from "./src/routes/rolesRoute";
import projectsRoute from "./src/routes/projectsRoute";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
// app.use(cors());

// app.use(activityLogger);
app.use(express.json());
app.use("/users", usersRoute);
app.use("/projects", projectsRoute);
const port = process.env.PORT || 3006;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
