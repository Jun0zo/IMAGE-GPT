import React, { useState } from "react";

import { Box } from "@mui/material";

import NavBar from "component/NavBar";
import Header from "component/Home/Header";
import SearchBar from "component/Home/SearchBar";

export default function Home() {
  const [value, setValue] = useState("");

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
          <SearchBar value={value} handleValue={setValue} />
        </Box>
      </Box>
    </div>
  );
}
