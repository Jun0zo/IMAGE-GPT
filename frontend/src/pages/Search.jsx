import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

import NavBar from "component/NavBar";
import SearchBar from "component/Home/SearchBar";
import ImageList from "component/Search/ImageList";
import OverviewChart from "component/Search/OverviewChart";

import server from "config/axiosConfig";
import API_ENDPOINTS from "config/endpointConfig";

const Search = () => {
  const { keyword } = useParams();
  const [statisticsData, setStatisticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [value, setValue] = useState(keyword);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response1 = await server.get(
          API_ENDPOINTS.STATISTICS.SIMILAR_KEYWORDS,
          { params: { keyword } }
        );
        const response2 = await server.get(
          API_ENDPOINTS.STATISTICS.SIMILAR_KEYWORDS,
          { params: { keyword } }
        );
        const response3 = await server.get(
          API_ENDPOINTS.STATISTICS.SIMILAR_KEYWORDS,
          { params: { keyword } }
        );
        const response4 = await server.get(API_ENDPOINTS.STATISTICS.AGE, {
          params: { keyword },
        });
        const response5 = await server.get(API_ENDPOINTS.STATISTICS.TREND, {
          params: { keyword, period:'month' },
        });
        const response6 = await server.get(API_ENDPOINTS.STATISTICS.GENDER, {
          params: { keyword },
        });
        const response7 = await server.get(API_ENDPOINTS.STATISTICS.TREND, {
          params: { keyword, period:'month' },
        });
        // const response8 = await server.get(API_ENDPOINTS.STATISTICS.DOWNLOAD, {
        //   params: { keyword },
        // });

        setStatisticsData({
          similarKeywords: response1.data,
          relatedVideos: response2.data,
          satisfaction: response3.data,
          age: response4.data,
          monthlyTrend: response5.data,
          gender: response6.data,
          weeklyTrend: response7.data,
          download: response7.data,
        });
      } catch (err) {
        alert(err)
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    console.log('or data ', statisticsData)
  }, [keyword]);
  return (
    <div>
      <NavBar />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* <Box sx={{ height: "100vh" }}> */}
        <Box sx={{ padding: "30px 0px" }}>
          <SearchBar keyword={keyword} value={value} handleValue={setValue} />
          <ImageList />
        </Box>

        {/* <Box sx={{ height: "100vh" }}> */}
        <Box sx={{ padding: "30px 0px" }}>
          {isLoading ? <div></div> : <OverviewChart isLoading={isLoading} statisticsData={statisticsData}/>}
          
        </Box>
      </div>
      {keyword}
    </div>
  );
};

export default Search;
