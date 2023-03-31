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

import GPTIcon from "../../component/GPTIcon.png";

const SearchBar = () => {
  return (
    <Box sx={{ minWidth: 120, display: "flex", justifyContent: "center" }}>
      <Paper>
        <FormControl
          fullWidth
          sx={{
            width: "100px",
            backgroundColor: "white",
            border: "0px",
          }}
        >
          <InputLabel id="demo-simple-select-label" shrink={false}>
            Age
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={"age"}
            label="자막"
            displayEmpty
            disableUnderline
            sx={{
              width: "100%",
              "& fieldset": {
                display: "none",
              },
            }}
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
        {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <img src={GPTIcon} alt="" style={{ height: "28px" }} /> */}
      </Paper>
    </Box>
  );
};

export default SearchBar;
