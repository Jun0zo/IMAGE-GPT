import NavBar from "../component/NavBar";
import * as React from "react";

import GPTIcon from "../component/GPTIcon.png";

import {
  Paper,
  InputBase,
  Divider,
  IconButton,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

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
        }}
      >
        <Box>
          <img src={GPTIcon} width="300px" alt="main-icon" />
          <h1 style={{ color: "white", fontSize: "50px" }}>IMAGE-GPT</h1>
        </Box>

        <Box sx={{ minWidth: 120, display: "flex" }}>
          <Paper>
            <FormControl
              fullWidth
              sx={{
                width: "100px",
                backgroundColor: "white",
                border: "0px",
                "&:hover": { border: "none" },
              }}
            >
              <InputLabel id="demo-simple-select-label" shrink={false}>
                Age
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                displayEmpty
                onChange={handleChange}
                sx={{ width: "100%" }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Paper>

          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
              borderLeft: "0px",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="검색하실 키워드를 입력하세요"
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
            >
              <DirectionsIcon />
            </IconButton>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}
