import React from "react";
import "../../App.css";
import Hero from "../Hero";
import Cards from "../Cards";
import Typography from "@mui/material/Typography";
function Home() {
  return (
    <>
      <Hero />
      <Cards />
      <Typography
        style={{
          fontWeight: "600",
          margin: "10px 20px",
        }}
      >
        This App is under development.. Desktop version is almost completed.
      </Typography>
    </>
  );
}

export default Home;
