import React, { useEffect, useState } from "react";
import Heart from "react-animated-heart";

import {
  ImageList as MUIImageList,
  ImageListItem,
  ImageListItemBar,
  Button,
  IconButton,
  TextField,
  DialogActions,
  Box,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@mui/material";

import DownloadIcon from '@mui/icons-material/Download';

import InfoIcon from "@mui/icons-material/Info";
import YoutubeIcon from "component/youtubeIcon.png"

const Modal = ({open, handleClose}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
  )
}

const ImageList = ({images}) => {
  const [isClickList, setIsClickList] = useState([]);
  const [cols, setCols] = useState(getColumns());
  const [modalOpen, setModalOpen] = useState(false)

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

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const handleModalOpen = (index) => {
    setModalOpen(true)
  }

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
                  console.log(event.currentTarget)
                  handleModalOpen(index)
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
                    avatar={<Avatar alt="Natacha" src={YoutubeIcon} />}
                    label="원본 보기"
                    sx={{backgroundColor:"rgba(181,181,181,.5)", 
                    "& .MuiChip-label": {
                      fontWeight: "bold", // Adjust the fontWeight as desired
                    },
                    "&:hover": {
                      backgroundColor:"rgba(181,181,181, .9)",
                      cursor:"pointer"
                    }}}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  />
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
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    />
                </div>
             </div>
          </ImageListItem>
        ))}
      </MUIImageList>

      <Modal open={modalOpen} handleClose={handleModalClose}/>
    </Box>
  );
};

export default ImageList;
