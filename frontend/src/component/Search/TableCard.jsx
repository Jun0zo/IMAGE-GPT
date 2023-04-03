import { Box, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const TableCard = (props) => {
  const { sx, title, isSmallCard, children } = props;
  return (
    <Box
      sx={{
        // border: "1px solid #30363d",
        backgroundColor: "#121e2d",
        borderRadius: "15px",
        boxShadow:
          "0 7px 14px 0 rgba(3, 12, 51, 0.15), 0 3px 6px 0 rgba(0, 0, 0, 0.2)",
      }}
    >
      {title ? (
        <Box
          sx={{
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            fontWeight: "700",
            color: "#d8e2ef",
            display: "flex",
            justifyContent: "space-between",

            backgroundColor: "#172230",
            padding: "20px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
            {title}
          </Box>
        </Box>
      ) : null}
      <Box
        sx={{
          height: "100%",
          ...sx,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default TableCard;
