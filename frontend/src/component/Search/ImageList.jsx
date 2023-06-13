import React, { useEffect, useState, useRef } from "react";
import Heart from "react-animated-heart";
import axios from 'axios';

import {
  ImageList as MUIImageList,
  ImageListItem,
  ImageListItemBar,
  Button,
  IconButton,
  TextField,
  DialogActions,
  Grid,
  Box,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@mui/material";

import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';

import InfoIcon from "@mui/icons-material/Info";
import YouTubeIcon from '@mui/icons-material/YouTube';
import ShareIcon from '@mui/icons-material/Share';

import server from "config/axiosConfig";
import API_ENDPOINTS from "config/endpointConfig";

import ImageListStles from 'component/Search/imageListStyles.css'

import {SlidingImageContainer, Modal} from 'component/Search/DetailModal'

const ImageList = ({images}) => {
  const [isClickList, setIsClickList] = useState([]);
  const [cols, setCols] = useState(getColumns());

  const [modalOpen, setModalOpen] = useState(false)
  const [modalLoading, setModalLoading] = useState(true)
  const [modalData, setModalData] = useState({})

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

  const getImageInfo = async (index) => {
    const response = await server.get(API_ENDPOINTS.DETAILS.IMAGE, {params: { id: index }})
    // .data.result
    console.log(response)
    return response.data.result
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setModalLoading(true)
  }

  const handleModalOpen = async (index) => {
    setModalLoading(true)
    setModalOpen(true)
    const imageData = await getImageInfo(index)
    console.log(imageData)
    setModalData(imageData)
    setModalLoading(false)
  }

  const showOverlay = (event) => {
    const target = event.currentTarget;
    target.querySelector('.overlay').style.opacity = 1
  }

  const hideOverlay = (event) => {
    const target = event.currentTarget;
    target.querySelector('.overlay').style.opacity = 0
  }

  const handleDownload = (image_url) => {
    const url = `https://unilab.kro.kr:8000/public/zzals/org/${image_url}`
    window.open(url, '_blank');
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <MUIImageList cols={cols} gap={20} sx={{ gap: "20px", width: "70vw" }}>
        {images.map((image, index) => (
          <ImageListItem key={index} onMouseEnter={showOverlay} onMouseLeave={hideOverlay}>
              <img
                src={`http://unilab.kro.kr:8000/public/zzals/org/${image.url}`}
                style={{borderRadius:"10px"}}
                // srcSet={`${item.img}`}
                // alt={item.title}
                loading="lazy"
              />
             <div className='overlay' 
              style={{
                opacity:"0",
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
              }}
              onClick={(event) => {
                if(event.currentTarget.className == 'overlay') {
                  event.stopPropagation();
                  handleModalOpen(image.id)
                }
              }}
              >
                <div style={{display:"flex", justifyContent:"center", paddingTop:"10px"}}>
                  <Heart isClick={isClickList[index]} onClick={(event) => setIsClickList(prevClickList => { 
                    event.stopPropagation();
                    const newClickList = [...prevClickList]
                    newClickList[index] = !newClickList[index];
                    return newClickList
                  })}
                  sx={{width:"50px"}}/>
                </div>

                <div style={{display:"flex", justifyContent:"space-evenly", paddingBottom:"10px"}}>
                  <Chip
                    icon={<YouTubeIcon style={{color:"#FF0000"}}/>}
                    label="원본 보기"
                    sx={{backgroundColor:"rgba(181,181,181,.5)", 
                    "& .MuiChip-label": {
                      fontWeight: "bold", // Adjust the fontWeight as desired
                    },
                    "&:hover": {
                      backgroundColor:"rgba(181,181,181, .9)",
                      cursor:"pointer"
                    }}}
                    
                    onClick={async (event) => {
                      // await server.get(API_ENDPOINTS.DETAILS.VIDEO_IMAGES, { params : {}})
                      // window.open(image.video_url)
                      event.stopPropagation();
                      const imageData = await getImageInfo(image.id)
                      const url = imageData.video_url;
                      window.open(url, "_blank", "noopener, noreferrer");
                    }}
                  />
                  <a
                    href={
                      `https://unilab.kro.kr:8000/public/zzals/org/${image.url}`
                    }
                    download={image.url}
                    target="_self"
                  >
                    <Chip
                    icon={<DownloadIcon style={{color:"#3580f2"}}/>}
                    label="다운로드"
                    sx={{backgroundColor:"rgba(181,181,181,.5)", 
                    "& .MuiChip-label": {
                      fontWeight: "bold", // Adjust the fontWeight as desired
                    },
                    "&:hover": {
                      backgroundColor:"rgba(181,181,181, .9)",
                      cursor:"pointer"
                    }}}
                    />
                </a>
                  
                </div>
             </div>
          </ImageListItem>
        ))}
      </MUIImageList>

      <Modal open={modalOpen} handleClose={handleModalClose} data={modalData} handleModalOpen={handleModalOpen}/>
    </Box>
  );
};

export default ImageList;
