import {
  Paper,
  InputBase,
  IconButton,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CommentIcon from "@mui/icons-material/Comment";

const SearchBar = ({ keyword }) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    alert("!!");
    event.preventDefault();
    navigate(`/search?keyword=${keyword}`);
  };

  return (
    <Box sx={{ minWidth: 120, display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: "4px 0px 0px 4px",
          border: "0px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            paddingLeft: "10px",
          }}
        >
          <CommentIcon sx={{ width: "30px" }} />
        </Box>
      </Paper>
      <Paper elevation={0}>
        <FormControl
          fullWidth
          sx={{
            width: "100px",
            backgroundColor: "white",
            border: "0px",
            paddingLeft: 0,
          }}
        >
          <InputLabel id="demo-simple-select-label" shrink={false}>
            <Typography sx={{ textAlign: "right" }}>자막</Typography>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={"자막"}
            label="자막"
            displayEmpty
            disableUnderline
            sx={{
              width: "100%",
              paddingLeft: "0px",
              "& fieldset": {
                display: "none",
              },
            }}
          >
            <MenuItem value={10}>자막</MenuItem>
            <MenuItem value={20}>영상제목</MenuItem>
            <MenuItem value={30}>영상</MenuItem>
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
          borderTopLeftRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, borderLeft: 0 }}
          placeholder="검색하실 키워드를 입력하세요"
          inputProps={{ "aria-label": "search" }}
          value={keyword}
          onChange={(e) => {
            handleSubmit(e);
          }}
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
