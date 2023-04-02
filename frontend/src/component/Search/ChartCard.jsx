import { Box, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ChartCard = (props) => {
  const { sx, title, isSmallCard, children } = props;
  console.log(isSmallCard);
  return (
    <Box
      sx={{
        // border: "1px solid #30363d",
        backgroundColor: "#233044",
        borderRadius: "15px",
      }}
    >
      {title ? (
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
          <Box sx={{ display: "flex", alignItems: "center" }}>{title}</Box>
          <Box>
            <IconButton aria-label="more">
              <MoreVertIcon sx={{ color: "#dedede" }} />
            </IconButton>
          </Box>
        </Box>
      ) : null}
      <Box
        sx={{
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
