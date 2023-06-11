import React, { useEffect, useState } from "react";
import Heart from "react-animated-heart";

import {
  ImageList as MUIImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Box,
  Chip,
  Avatar
} from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";
import YoutubeIcon from "component/youtubeIcon.png"

const ImageList = ({images}) => {
  const [isClickList, setIsClickList] = useState([]);
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
    setIsClickList(Array(images.length).fill(false))
  }, [images])

  useEffect(() => {
    function handleResize() {
      setCols(getColumns());
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showOverlay = (event) => {
    const target = event.currentTarget;
    target.querySelector('.overlay').style.opacity = 1
  }

  const hideOverlay = (event) => {
    const target = event.currentTarget;
    target.querySelector('.overlay').style.opacity = 0
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <MUIImageList cols={cols} gap={20} sx={{ gap: "20px", width: "70vw" }}>
        {images.map((image_url, index) => (
          <ImageListItem key={index} onMouseEnter={showOverlay} onMouseLeave={hideOverlay}>
              <img
                src={`http://unilab.kro.kr:8000/public/zzals/${image_url}`}
                style={{borderRadius:"10px"}}
                // srcSet={`${item.img}`}
                // alt={item.title}
                loading="lazy"
              />
             <div className='overlay' style={{
              opacity:"1",
              backgroundColor:"rgba(0,0,0,0.3)", 
              borderRadius:"10px", 
              position:"absolute", 
              top:0, 
              left:0, 
              width:"100%", 
              height:"100%",
              cursor:"zoom-in",
              display:"flex",
              flexDirection:"column",
              justifyContent:"space-between"
              }}>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <Heart isClick={isClickList[index]} onClick={() => setIsClickList(prevClickList => { 
                    const newClickList = [...prevClickList]
                    newClickList[index] = !newClickList[index];
                    console.log(newClickList)
                    return newClickList
                  })}
                  sx={{width:"50px"}}/>
                </div>

                <div style={{display:"flex", justifyContent:"space-around"}}>
                  <Chip
                    avatar={<Avatar alt="Natacha" src={YoutubeIcon} />}
                    label="원본 보기"
                    sx={{backgroundColor:"rgba(181,181,181,.5)"}}
                  />
                  <Chip
                    avatar={<Avatar alt="Natacha" src={YoutubeIcon} />}
                    label="다운로드"
                    sx={{backgroundColor:"rgba(181,181,181,.5)"}}
                  />
                </div>
             </div>
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
