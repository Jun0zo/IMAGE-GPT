import GPTIcon from "../../component/GPTIcon.png";

import { Box } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "30px",
      }}
    >
      <img src={GPTIcon} width="300px" alt="main-icon" />
      <h1
        style={{
          color: "white",
          fontSize: "50px",
          margin: "10px",
        }}
      >
        IMAGE-GPT
      </h1>
    </Box>
  );
};

export default Header;
