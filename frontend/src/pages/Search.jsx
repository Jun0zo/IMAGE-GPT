import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Button, IconButton, Dialog, AppBar , Divider, ListItemText, ListItem,  List, Toolbar, Slide, Typography   } from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';



import NavBar from "component/NavBar";
import SearchBar from "component/Home/SearchBar";
import ImageList from "component/Search/ImageList";
import OverviewChart from "component/Search/OverviewChart";

import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CloseIcon from '@mui/icons-material/Close';

import server from "config/axiosConfig";
import API_ENDPOINTS from "config/endpointConfig";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Search = () => {
  const { keyword } = useParams();
  const [images, setImages] = useState([]);
  const [statisticsData, setStatisticsData] = useState(null);

  // statistics loading and error information
  const [isStatisticsLoading, setIsStatisticsLoading] = useState(true);
  const [isStatisticsError, setStatisticsError] = useState(null);

  // images loading and error information
  const [isImagesLoading, setIsImagesLoading] = useState(true);
  const [isImagesError, setImagesError] = useState(null);

  const [value, setValue] = useState(keyword);
  const [isRandom, setRandom] = useState(true);

  const [statisticsOpen, setStatisticsOpen] = useState(false)

  const loadAll = (is_random) => {
    const fetchStatisticsData = async () => {
      try {
        setIsStatisticsLoading(false);
        setStatisticsData(undefined)
        const response1 = await server.get(
          API_ENDPOINTS.STATISTICS.SIMILAR_KEYWORDS,
          { params: { keyword } }
        );
        const response2 = await server.get(
          API_ENDPOINTS.STATISTICS.RELATED_VIDEOS,
          { params: { keyword } }
        );
        const response3 = await server.get(
          API_ENDPOINTS.STATISTICS.SATISFACTION,
          { params: { keyword, is_random } }
        );
        const response4 = await server.get(API_ENDPOINTS.STATISTICS.AGE, {
          params: { keyword, is_random },
        });
        const response5 = await server.get(API_ENDPOINTS.STATISTICS.TREND, {
          params: { keyword, is_random, period:'month' },
        });
        const response6 = await server.get(API_ENDPOINTS.STATISTICS.GENDER, {
          params: { keyword, is_random },
        });
        const response7 = await server.get(API_ENDPOINTS.STATISTICS.TREND, {
          params: { keyword, period:'month' },
        });
        const response8 = await server.get(API_ENDPOINTS.STATISTICS.DOWNLOAD, {
          params: { keyword, is_random },
        });

        setStatisticsData({
          similarKeywords: response1.data,
          relatedVideos: response2.data,
          satisfaction: response3.data,
          age: response4.data,
          monthlyTrend: response5.data,
          gender: response6.data,
          weeklyTrend: response7.data,
          download: response8.data,
        });

      } catch (err) {
        alert(err)
        setStatisticsError(err.message);
      } finally {
        setIsStatisticsLoading(false);
      }
    };

    const fetchImages = async () => {
      setIsImagesLoading(true)
      try {
        const response = await server.get(API_ENDPOINTS.SEARCH.IMAGES, {
          params: { keyword }
        })
        setImages(response.data.result)
      } catch (err) {
        
      } finally {
        
        setIsImagesLoading(false)
      }

    }

    fetchImages();
    fetchStatisticsData();
  }

  const handleReloadAll = () => {
    loadAll(isRandom)
  }

  const handleClickOpen = () => {
    setStatisticsOpen(true);
  };

  const handleClose = () => {
    setStatisticsOpen(false);
  };

  useEffect(() => {
    loadAll(isRandom)
  }, [keyword, isRandom]);
  return (
    <div>
      <NavBar />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ padding: "30px 0px" }}>
          <SearchBar keyword={keyword} value={value} handleValue={setValue} />
          {isImagesLoading ? null : <ImageList images={images}/>}  
        </Box>
        <Box sx={{ padding: "30px 0px" }}>
          
        </Box>
      </div>

      <Button
        sx={{
          
          padding: '10px',
          color: 'white',
          borderRadius: '4px',
        }}
      >asdf</Button>

      {/* <IconButton aria-label="delete" size="large" color="secondary" sx={{position: 'fixed',
          bottom: '20px',
            right: '20px',
          }} onClick={handleClickOpen}>
        <QueryStatsIcon fontSize="inherit" />
      </IconButton> */}
      <Button variant="contained" startIcon={<QueryStatsIcon />} 
        sx={{position: 'fixed',
            bottom: '20px',
              right: '20px',
              borderRadius: "20px"
          }}
          size="large"
          onClick={handleClickOpen}>
        통계 데이터
      </Button>
      {keyword}

      <Dialog
        fullScreen
        open={statisticsOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
        keyword={keyword}
        bodyStyle={{ backgroundColor: '#0b1827' }}

      >
        <Box sx={{backgroundColor: '#0b1827'}}>
        <AppBar sx={{ position: 'relative', backgroundColor:"rgba(0,0,0,0)" }} elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              "{keyword}"에 대한 통계 데이터
            </Typography>
          </Toolbar>
        </AppBar>
        <Box>
        <OverviewChart isStatisticsLoading={isStatisticsLoading} 
          statisticsData={statisticsData} 
          keyword={keyword} 
          handleReload={handleReloadAll}
          isRandom={isRandom}
          setRandom={setRandom}
          />
        </Box>
        </Box>
        
      </Dialog>
    </div>
  );
};

export default Search;
