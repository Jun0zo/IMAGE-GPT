import React, { useEffect, useState, useRef } from "react";
import Heart from "react-animated-heart";

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

import InfoIcon from "@mui/icons-material/Info";
import YoutubeIcon from "component/youtubeIcon.png"

import server from "config/axiosConfig";
import API_ENDPOINTS from "config/endpointConfig";


const SlidingImageContainer = ({ images }) => {
  const containerRef = useRef(null);
  const gap = 10; // Adjust this value based on the desired gap between images
  let currentPosition = 0;
  let imageWidth;

  const slideImages = () => {
    const container = containerRef.current;
    currentPosition -= imageWidth + gap;
    container.style.transform = `translateX(${currentPosition}px)`;

    // Reset position when all images have passed
    if (currentPosition <= -((imageWidth + gap) * (images.length - 1))) {
      currentPosition = 0;
      container.style.transform = 'translateX(0)';
    }
  };

  useEffect(() => {
    if (containerRef.current && containerRef.current.firstChild) {
      console.log('con : ', containerRef.current)
      console.log(containerRef.current)
      console.log(containerRef.current.firstChild)
      
      const firstImage = containerRef.current.firstChild;
      imageWidth = firstImage.offsetWidth;
  
      const slideInterval = setInterval(slideImages, 2000); // Adjust the interval duration as desired
  
      return () => {
        clearInterval(slideInterval); // Clean up the interval when the component unmounts
      };
    }
    
  }, [images]);

  return (
    <div style={{ overflow: 'hidden' }}>
      <div ref={containerRef} style={{ display: 'flex', transition: 'transform 0.5s' }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={`http://unilab.kro.kr:8000/public/zzals/org/${image.url}`}
            style={{ height: '100px', width: `${imageWidth}px`, marginRight: `${gap}px` }}
            alt="Image"
          />
        ))}
      </div>
    </div>
  );
};

const Modal = ({open, handleClose, loadding, data}) => {
  const [relatedImages, setRelatedImages] = useState([])

  const getImagesFromVideoID = async (video_id) => {
    const response = await server.get(API_ENDPOINTS.DETAILS.VIDEO_IMAGES, {params: { video_id }})
    if (response.status === 200) {
      return response.data.result
    } else {
      return []
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log(data)
      const images = await getImagesFromVideoID(data.video_id)
      console.log(images)
      setRelatedImages(images)
    }
    fetchData()
  }, [data])
  const images = Array.from({ length: 30 }).fill("_100.jpg")
  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='xl'>
      {loadding ? <></> : 
      <div>
        <DialogContent>
          <DialogContentText sx={{ maxHeight: "700px"}}>
            <Grid container sx={{width:"100%", maxHeight:"100%"}}>
              <Grid item xl={6} lg={6} sm={12} sx={{ width:"100%", display: "flex", alignItems: "center", padding:"15px"}}>
                <img src={`http://unilab.kro.kr:8000/public/zzals/org/${data.image_url}`}
                    style={{borderRadius:"10px", width:"100%"}}
                    // srcSet={`${item.img}`}
                    // alt={item.title}
                    loading="lazy" />
              </Grid>
              {
                  Object.keys(data).length === 0 ?  <></> :
                  <Grid item xl={6} lg={6} sm={12} sx={{ padding:"15px", maxHeight:"100%"}}>
                    <div style={{maxHeight:"100%", overflowY:"auto", marginTop:"0px"}}>
                      <p style={{fontSize:"24px"}}>{data.image_subtitle.replace(/_/g, " ")}</p>
                      <p>{data.video_title}</p>
                      <p style={{ whiteSpace: "pre-line" }}>영상 설명 : {data.video_description.substring(0,50)}</p>
                      <p>태그 정보 : {data.tags}</p>
                  
                    </div>
                 </Grid>
              }
              <Grid item xl={12} lg={12} sm={12} sx={{paddingLeft:"15px", paddingRight:"15px", overflowX:"hidden"}}>
                {/* <div className="imageContainer" style={{display:"flex", gap:"10px"}}>
                  {images.map(image_url => {
                    return <img src={`http://unilab.kro.kr:8000/public/zzals/org/${image_url}`} style={{height:"100px"}} />
                  })}
                </div> */}
                <SlidingImageContainer images={relatedImages} />
                
              </Grid>
              
            </Grid>
            
          </DialogContentText>
          
        </DialogContent>
      </div>}
        
    </Dialog>
  )
}

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

      <Modal open={modalOpen} handleClose={handleModalClose} data={modalData}/>
    </Box>
  );
};

export default ImageList;
