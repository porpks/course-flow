import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

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

export default App2;
