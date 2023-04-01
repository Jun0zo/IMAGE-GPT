import { Box } from "@mui/material";

const ChartCard = (props) => {
  const { sx, small_title, big_title, children } = props;
  return (
    <Box
      sx={{
        border: "1px solid #30363d",
        borderRadius: "15px",
      }}
    >
      {small_title ? <Box sx={{ color: "white" }}>{small_title}</Box> : null}
      {big_title ? (
        <Box
          sx={{
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            color: "white",
            backgroundColor: "#262626",
            padding: "10px",
          }}
        >
          {big_title}
        </Box>
      ) : null}
      <Box sx={{ padding: "20px", height: "100%", ...sx }}>{children}</Box>
    </Box>
  );
};

export default ChartCard;
