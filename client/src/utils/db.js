import { createClient } from "@supabase/supabase-js";
// import dotenv from "dotenv";

// dotenv.config();

const supabase = createClient(
  "https://yzcnxdhntdijwizusqmn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6Y254ZGhudGRpandpenVzcW1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzOTQ4MDUsImV4cCI6MjAwODk3MDgwNX0.Odeb-mmImmrybkiL88Z77NDZ3l3imSkgjIs5wiPFRKw"
);

// async function getCountries() {
//   const result = await supabase.from("countries").select();
// }


export default supabase;