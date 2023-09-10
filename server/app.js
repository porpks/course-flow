import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./apps/auth.js";
import profileRouter from "./apps/profile.js";
import courseRouter from "./apps/course.js";
import MyCourseRouter from "./apps/mycourse.js";

// import { client } from "./utils/db.js";
import dotenv from "dotenv";

async function init() {
  //   dotenv.config();
  const app = express();
  const port = 4000;
  //   await client.connect();
  app.use(cors());
  app.use(bodyParser.json());

  app.use("/auth", authRouter);
  app.use("/profile", profileRouter);
  app.use("/ourcourse", courseRouter);
  //   app.use("/posts", postRouter);
  app.use("/mycourse", MyCourseRouter);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
