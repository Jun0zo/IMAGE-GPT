import React, { useEffect, useState, useRef } from "react";

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


import YouTubeIcon from '@mui/icons-material/YouTube';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

import VisibilityIcon from '@mui/icons-material/Visibility';

import ShareIcon from '@mui/icons-material/Share';

import server from "config/axiosConfig";
import API_ENDPOINTS from "config/endpointConfig";

import ImageListStles from 'component/Search/imageListStyles.css'
import YoutubePNGIcon from 'component/youtubeIcon.png'

export const SlidingImageContainer = ({ images, handleModalOpen }) => {
    const containerRef = useRef(null);
    const gap = 10; // Adjust this value based on the desired gap between images
    let currentPosition = 0;
    let imageWidth;
  
    const slideImages = () => {
      if (imageWidth < 2) {
        const firstImage  = containerRef.current.firstChild;
        imageWidth = firstImage.offsetWidth;
        return
      }
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
      const options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1, // 10% intersection ratio
      };
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetImage = entry.target;
            const imageUrl = targetImage.getAttribute('data-src');
            if (imageUrl) {
              targetImage.src = imageUrl;
              observer.unobserve(targetImage);
            }
          }
        });
      }, options);
  
      if (containerRef.current) {
        const images = containerRef.current.querySelectorAll('img');
        images.forEach((image) => {
          observer.observe(image);
        });
      }
  
      if (containerRef.current && containerRef.current.firstChild) {
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
              src={''} // Set an initial placeholder source or an empty string
              data-src={`http://unilab.kro.kr:8000/public/zzals/org/${image.url}`}
              style={{ height: '100px', width: `${imageWidth}px`, marginRight: `${gap}px`, borderRadius:"10px", cursor: 'pointer' }}
              image_id={image.id}
              alt="Image"
  
              onClick={()=>{handleModalOpen(image.id)}}
            />
          ))}
        </div>
      </div>
    );
};
  
export const Modal = ({open, handleClose, loadding, data, handleModalOpen}) => {
    const [relatedImages, setRelatedImages] = useState([])
    const [isDebug, setDeug] = useState(false)
  
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
  
    return (
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='xl'>
        {loadding ? <></> : 
        <div>
          <DialogContent>
            <DialogContentText sx={{ maxHeight: "900px"}}>
              <Grid container sx={{width:"100%", maxHeight:"100%"}}>
                <Grid item xl={6} lg={6} sm={12} sx={{ width:"100%", display: "flex", alignItems: "center", padding:"15px"}}>
                  
                  <img src={isDebug ? `http://unilab.kro.kr:8000/public/zzals/debug/${data.image_url}` : `http://unilab.kro.kr:8000/public/zzals/org/${data.image_url}`}
                      style={{borderRadius:"10px", width:"100%", borderRadius:"10px"}}
                      // srcSet={`${item.img}`}
                      // alt={item.title}
                      loading="lazy" />
                </Grid>
                {
                    Object.keys(data).length === 0 ?  <></> :
                    <Grid item xl={6} lg={6} sm={12} sx={{ padding:"15px", maxHeight:"400px", overflowY:"auto"}}>
                      <div style={{position:"relative", height:"100%"}} >
                        <div style={{display:"flex", gap:"10px", position:"absolute", right:"0px"}}>
                          <Chip icon={<VisibilityIcon />} label="AI 분석" onClick={() => {setDeug(prevStatus => !prevStatus)}}
                            id={isDebug ? 'debug-chip' : 'normal-chip'}/>
                          <Chip icon={<ShareIcon />} label="공유" />
                        </div>
                        
                        <div sx={{maxHeight:"100%", overflowY:"auto"}}>
                          <Box sx={{display:"flex", gap:"10px"}}>
                            <div style={{paddingTop:"5px"}}>
                              <ImageSearchIcon sx={{width:"30px"}}/>
                            </div>
                            <div>
                              <p style={{fontSize:"24px", marginTop:"0px", color:"#272727", fontWeight:"600"}}>
                                {data.image_subtitle.replace(/_/g, " ").slice(0, 30)}
                                {data.image_subtitle.length > 30 && "..."}
                              </p>
                            </div>
                          </Box>
                          
                          
                          <Box sx={{display:"flex", gap:"10px"}}>
                            <div >
                              <div>
                                <img src={YoutubePNGIcon} style={{width:"30px"}}/>
                              </div>
                              
                            </div>
                            <div>
                              <p style={{fontWeight: "600", fontSize:"20px", "marginTop":"0px"}}>{data.video_title.length > 30 ? data.video_title.substring(0, 30) + '...' : data.video_title}</p>
                              <hr/>
                              <p >동영상 태그</p>
                              <p style={{ fontWeight:"400", lineHeight: "30px"}}>
                                {
                                  data.video_tags.split(', ').slice(0, 20).map(video_tag => <Chip size="small" label={video_tag} style={{marginRight:"6px"}}/>)
                                }
                                {data.video_tags.split(", ").length > 20 && "..." /* Add ellipsis if tags exceed 20 */}
                              </p>
                              
                              <hr/>
                              <p style={{ fontWeight:"400", whiteSpace: "pre-line" }}>동영상 설명</p>
                              <p style={{cololr:"#414141"}}>
                                {data.video_description}
                                {/* {data.video_description.substring(0,200)} */}
                                {/* {data.video_description.length > 200 && "..." /* Add ellipsis if tags exceed 20 */}
                                </p>
                            </div>
                          </Box>
                        </div>
                      </div>
                      
                   </Grid>
                }
                <Grid item xl={12} lg={12} sm={12} sx={{paddingLeft:"15px", paddingRight:"15px", overflowX:"hidden"}}>
                  {/* <div className="imageContainer" style={{display:"flex", gap:"10px"}}>
                    {images.map(image_url => {
                      return <img src={`http://unilab.kro.kr:8000/public/zzals/org/${image_url}`} style={{height:"100px"}} />
                    })}
                  </div> */}
                  <SlidingImageContainer images={relatedImages} handleModalOpen={handleModalOpen}/>
                  
                </Grid>
                
              </Grid>
              
            </DialogContentText>
            
          </DialogContent>
        </div>}
          
      </Dialog>
    )
}