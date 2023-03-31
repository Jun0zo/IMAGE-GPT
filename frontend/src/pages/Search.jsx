import * as React from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

import NavBar from "../component/NavBar";
import SearchBar from "../component/Home/SearchBar";
import ImageList from "../component/Search/ImageList";
import OverviewChart from "../component/Search/OverviewChart";

const Search = () => {
  const { keyword } = useParams();
  return (
    <div>
      <NavBar />
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "50px" }}
      >
        <SearchBar />
        <ImageList />
        <OverviewChart />
      </div>
      {keyword}
    </div>
  );
};

export default Search;
