import * as React from "react";
import { useParams } from "react-router-dom";

import NavBar from "../component/NavBar";
import SearchBar from "../component/Home/SearchBar";
import ImageList from "../component/Search/ImageList";

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
      </div>
      {keyword}
    </div>
  );
};

export default Search;
