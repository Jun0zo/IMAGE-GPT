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
      alert(keyword);
      try {
        setIsLoading(true);
        const response1 = await server.get(
          API_ENDPOINTS.STATISTICS.SIMILAR_KEYWORDS,
          { keyword }
        );
        const response2 = await server.get(
          API_ENDPOINTS.STATISTICS.RELATED_VIDEOS,
          { keyword }
        );
        const response3 = await server.get(
          API_ENDPOINTS.STATISTICS.SATISFACTION,
          { keyword }
        );

        const response4 = await server.get(API_ENDPOINTS.STATISTICS.AGE, {
          keyword,
        });
        const response5 = await server.get(API_ENDPOINTS.STATISTICS.TREND, {
          keyword,
        });
        const response6 = await server.get(API_ENDPOINTS.STATISTICS.GENDER, {
          keyword,
        });
        const response7 = await server.get(API_ENDPOINTS.STATISTICS.TREND, {
          keyword,
        });
        const response8 = await server.get(API_ENDPOINTS.STATISTICS.DOWNLOAD, {
          keyword,
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
