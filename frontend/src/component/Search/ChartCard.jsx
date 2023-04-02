import { Box, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ChartCard = (props) => {
  const { sx, small_title, big_title, children } = props;
  return (
    <Box
      sx={{
        // border: "1px solid #30363d",
        backgroundColor: "#233044",
        borderRadius: "15px",
      }}
    >
      {small_title ? <Box sx={{ color: "white" }}>{small_title}</Box> : null}
      {big_title ? (
        <Box
          sx={{
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            padding: "10px 20px 0px 20px",
            fontWeight: "800",
            color: "#dedede",
            display: "flex",
            justifyContent: "space-between",
            // backgroundColor: "#262626",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>{big_title}</Box>
          <Box>
            <IconButton aria-label="more">
              <MoreVertIcon sx={{ color: "#dedede" }} />
            </IconButton>
          </Box>
        </Box>
      ) : null}
      <Box sx={{ padding: "20px", height: "100%", ...sx }}>{children}</Box>
    </Box>
  );
};

export default ChartCard;
