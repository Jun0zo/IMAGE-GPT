import React, { useEffect, useState } from "react";

import {
  ImageList as MUIImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Box,
} from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";

const ImageList = () => {
  const [cols, setCols] = useState(getColumns());
  function getColumns() {
    const width = window.innerWidth;
    if (width >= 1300) {
      return 4;
    } else if (width >= 900) {
      return 3;
    } else if (width >= 600) {
      return 2;
    } else {
      return 1;
    }
  }

  useEffect(() => {
    function handleResize() {
      setCols(getColumns());
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <MUIImageList cols={cols} gap={20} sx={{ gap: "20px", width: "70vw" }}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}`}
              srcSet={`${item.img}`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.author}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </MUIImageList>
    </Box>
  );
};

const itemData = [
  {
    img: "http://localhost:8000/public/images/0.jpg",
    title: "Breakfast",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "http://localhost:8000/public/images/101.jpg",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "http://localhost:8000/public/images/212.jpg",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "http://localhost:8000/public/images/3.jpg",
    title: "Coffee",
    author: "@nolanissac",
    cols: 2,
  },
  {
    img: "http://localhost:8000/public/images/4.jpg",
    title: "Hats",
    author: "@hjrc33",
    cols: 2,
  },
  {
    img: "http://localhost:8000/public/images/5.jpg",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "http://localhost:8000/public/images/18.jpg",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "http://localhost:8000/public/images/74.jpg",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "http://localhost:8000/public/images/48.jpg",
    title: "Mushrooms",
    author: "@silverdalex",
    rows: 2,
    cols: 2,
  },
  {
    img: "http://localhost:8000/public/images/9.jpg",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "http://localhost:8000/public/images/81.jpg",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "http://localhost:8000/public/images/11.jpg",
    title: "Bike",
    author: "@southside_customs",
    cols: 2,
  },
];

export default ImageList;
