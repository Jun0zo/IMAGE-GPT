import NavBar from "../component/NavBar";
import * as React from "react";

import { Box } from "@mui/material";

import Header from "../component/Home/Header";
import SearchBar from "../component/Home/SearchBar";

export default function Home() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "calc(80vh - 70px)",
        }}
      >
        <Box>
          <Header />
          <SearchBar />
        </Box>
      </Box>
    </div>
  );
}
