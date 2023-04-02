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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response1 = await server.get(
          API_ENDPOINTS.STATISTICS.SIMILAR_KEYWORDS,
          { params: { keyword } }
        );
        console.log("res1");
        const response2 = await server.get(
          API_ENDPOINTS.STATISTICS.RELATED_VIDEOS,
          { params: { keyword } }
        );
        console.log("res2");
        const response3 = await server.get(
          API_ENDPOINTS.STATISTICS.SATISFACTION,
          { params: { keyword } }
        );
        console.log("res3");
        const response4 = await server.get(API_ENDPOINTS.STATISTICS.AGE, {
          params: { keyword },
        });
        const response5 = await server.get(API_ENDPOINTS.STATISTICS.TREND, {
          params: { keyword },
        });
        const response6 = await server.get(API_ENDPOINTS.STATISTICS.GENDER, {
          params: { keyword },
        });
        const response7 = await server.get(API_ENDPOINTS.STATISTICS.TREND, {
          params: { keyword },
        });
        const response8 = await server.get(API_ENDPOINTS.STATISTICS.DOWNLOAD, {
          params: { keyword },
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
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [keyword]);
  return (
    <div>
      <NavBar />
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "50px" }}
      >
        <Box sx={{ height: "100vh" }}>
          <SearchBar />
          <ImageList />
        </Box>

        <Box sx={{ height: "100vh" }}>
          <OverviewChart />
        </Box>
      </div>
      {keyword}
    </div>
  );
};

export default Search;
