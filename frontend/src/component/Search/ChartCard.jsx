import { Box } from "@mui/material";

const ChartCard = (props) => {
  const { sx, small_title, big_title, children } = props;
  return (
    <Box
      sx={{
        border: "1px solid #30363d",
        padding: "20px",
        borderRadius: "20px",
        ...sx,
      }}
    >
      {small_title ? <Box sx={{ color: "white" }}>{small_title}</Box> : null}
      {big_title ? <Box></Box> : null}
      <Box sx={{ padding: "20px", height: "100%" }}>{children}</Box>
    </Box>
  );
};

export default ChartCard;
