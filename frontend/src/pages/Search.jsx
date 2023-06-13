import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Button } from "@mui/material";

import NavBar from "component/NavBar";
import SearchBar from "component/Home/SearchBar";
import ImageList from "component/Search/ImageList";
import OverviewChart from "component/Search/OverviewChart";

import server from "config/axiosConfig";
import API_ENDPOINTS from "config/endpointConfig";

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

  useEffect(() => {
    loadAll(isRandom)
  }, [keyword]);
  return (
    <div>
      <NavBar />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ padding: "30px 0px" }}>
          <SearchBar keyword={keyword} value={value} handleValue={setValue} />
          {isImagesLoading ? null : <ImageList images={images}/>}  
        </Box>
        <Box sx={{ padding: "30px 0px" }}>
          <OverviewChart isStatisticsLoading={isStatisticsLoading} 
          statisticsData={statisticsData} 
          keyword={keyword} 
          handleReload={handleReloadAll}
          isRandom={isRandom}
          setRandom={setRandom}
          />
        </Box>
      </div>
      {keyword}
    </div>
  );
};

export default Search;
