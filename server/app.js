import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import authRouter from "./apps/auth.js";
// import postRouter from "./apps/posts.js";
// import { client } from "./utils/db.js";
// import dotenv from "dotenv";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

async function init() {
  //   dotenv.config();
  const app = express();
  const port = 4000;
  //   await client.connect();
  //   app.use(cors());
  //   app.use(bodyParser.json());
  //   app.use("/auth", authRouter);
  //   app.use("/posts", postRouter);
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  //   app.get("*", (req, res) => {
  //     res.status(404).send("Not found");
  //   });
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
  //
}

const supabase = createClient(
  "https://yzcnxdhntdijwizusqmn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6Y254ZGhudGRpandpenVzcW1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzOTQ4MDUsImV4cCI6MjAwODk3MDgwNX0.Odeb-mmImmrybkiL88Z77NDZ3l3imSkgjIs5wiPFRKw"
);

function App2() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}

init();
