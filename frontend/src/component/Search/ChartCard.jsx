import { Box, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ChartCard = (props) => {
  const { sx, title, isSmallCard, children } = props;
  return (
    <Box
      sx={{
        // border: "1px solid #30363d",
        backgroundColor: "#121e2d",
        borderRadius: "15px",
        boxShadow:
          "0 7px 14px 0 rgba(3, 12, 51, 0.15), 0 3px 6px 0 rgba(0, 0, 0, 0.2)",
          height: title ? undefined : "100%"
      }}
    >
      {title ? (
        <Box
          sx={{
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            padding: "10px 20px 0px 20px",
            fontWeight: "700",
            color: "#d8e2ef",
            display: "flex",
            justifyContent: "space-between",

            // backgroundColor: "#262626",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
            {title}
          </Box>
          <Box sx={{}}>
            <IconButton aria-label="more">
              <MoreVertIcon sx={{ color: "#dedede" }} />
            </IconButton>
          </Box>
        </Box>
      ) : null}
      <Box
        sx={{
          color: "rgb(182,193,210)",
          padding: "20px",
          height: "100%",
          paddingTop: isSmallCard ? "5px" : "20px",
          paddingBottom: isSmallCard ? "5px" : "20px",
          ...sx,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ChartCard;
