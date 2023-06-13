import React, { useState, useRef, useEffect } from "react";
import Chart from "react-apexcharts";

import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box, 
  Grid, 
  Chip, 
  Avatar, 
  LinearProgress,
  Stack,
  Button
} from "@mui/material";

import ChartCard from "./ChartCard";
import TableCard from "./TableCard";

import CheckIcon from "@mui/icons-material/Check";
import RefreshIcon from '@mui/icons-material/Refresh';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import CloudOffIcon from '@mui/icons-material/CloudOff';

import "styles/chart-animation.css";

import good from "images/good.svg";

const animationConfig = {
  enabled: true,
  easing: "easeinout",
  speed: 1500, // Change this to adjust the animation speed
  animateGradually: {
    enabled: true,
    delay: 150, // Change this to adjust the delay between animations
  },
};

const KeywordTable = ({result}) => {
  return (
    <TableContainer
      sx={{
        height: "100%",
        color: "#949aa3",
        backgroundColor: "rgba(0,0,0,0)",
      }}
      component={Paper}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ color: "#e2e2e2", borderBottom: "1px solid #242e3c" }}
            >
              키워드
            </TableCell>
            <TableCell
              align="right"
              sx={{ color: "#e2e2e2", borderBottom: "1px solid #242e3c" }}
            >
              유사도
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {/* const rows = [
          createData1("안녕하세요", 159, 62.1),
          createData1("안녕히 계세요 여러분", 237, 34.9),
          createData1("재.롱.이.귀.여.워", 262, 11.3),
          createData1("얀녕?", 305, 73.7),
        ]; */}
          {result ? (result.map((info, idx) => (
            <TableRow
              key={idx}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  color: "#e2e2e2",
                  borderBottom: "1px solid #242e3c",
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  height: "35px",
                  fontSize: "14px",
                }}
              >
                <Avatar />
                {info.subtitle.replace(/_/g, " ")}
                <Chip
                  size="small"
                  label={info.distance + "점"}
                  sx={{
                    backgroundColor: "rgb(35,46,68)",
                    color: "rgb(44,123,229)",
                  }}
                />
              </TableCell>

              <TableCell
                align="right"
                sx={{
                  color: "#e2e2e2",
                  borderBottom: "1px solid #242e3c",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    gap: "20px",
                  }}
                >
                  <LinearProgress
                    variant="determinate"
                    value={info.distance}
                    sx={{
                      backgroundColor: "#242e3c",
                      borderRadius: "50px",
                      width: "40%",
                      height: "10px",
                    }}
                  />
                  <Box sx={{ fontSize: "12px" }}>{info.similarity}</Box>
                </Box>
              </TableCell>
            </TableRow>
          ))) : (<></>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const VideoTable = ({result}) => {

  const getThumbnailImg = (url) => {
    let youtubeId = url.split("v=")[1];
    let new_image_url = "https://i.ytimg.com/vi/" + youtubeId + "/hq720.jpg"
    return new_image_url
  }
  return (
    <TableContainer
      sx={{
        height: "100%",
        color: "#949aa3",
        backgroundColor: "rgba(0,0,0,0)",
      }}
      component={Paper}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ color: "#e2e2e2", borderBottom: "1px solid #242e3c" }}
            >
              영상 이름
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result ? (result.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  color: "#e2e2e2",
                  borderBottom: "1px solid #242e3c",
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  height: "35px",
                  fontSize: "14px",
                }}
              >
                <Box>
                  <img src={getThumbnailImg(row.url)} alt="" height="30px" />
                </Box>
                {row.title.slice(0,20)}
              </TableCell>
            </TableRow>
          ))) : (<></>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const LoadingBox = () => {
  return (
    <Box sx={{ height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <CircularProgress size={70}/>
    </Box>
  )
}

const SafisfactionShowTable = ({result}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "100px",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <img
              src={good}
              alt=""
              height="100px"
              style={{ paddingRight: "20px" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            <span
              style={{
                marginBottom: "10px",
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              좋아요 현황
            </span>
            <span
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#00d27a",
                marginBottom: "2px",
              }}
            >
              평균
            </span>
            <span>좋아요 비율 : {result.ratio}%</span>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <span
            style={{
              color: "rgb(44,123,229",
              fontWeight: "700",
              fontSize: "40px",
              margin: "8px 0px",
            }}
          >
            {result.likes_count}
          </span>
          <span style={{ fontSize: "12px" }}>{result.likes_count} / {result.searches_count}</span>
        </Box>
      </Box>
    </Box>
  );
};

const SatisfactionVoteTable = () => {
  return null;
};

const SearchCountByAgeGroupChart = ({result}) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "남성",
        data: [44, 55, 57, 30, 17, 20],
        color: "#008FFB",
      },
      {
        name: "여성",
        data: [76, 85, 101, 24, 22, 10],
        color: "#FF4560",
      },
      {
        name: "총합",
        data: [113, 135, 151, 67, 38, 31],
        color: "#354050",
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      grid: {
        borderColor: "#424f5e",
        strokeDashArray: 5,
        position: "back",
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
            style: {
              colors: "#424f5e",
              type: "dotted",
            },
          },
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 7,
          borderRadiusApplication: "end",
          horizontal: false,
          columnWidth: "45%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["10대", "20대", "30대", "40대", "50대", "60대"],
        labels: {
          style: {
            colors: [
              "#424f5e",
              "#424f5e",
              "#424f5e",
              "#424f5e",
              "#424f5e",
              "#424f5e",
            ],
          },
        },
      },
      yaxis: {
        title: {
          text: " 회 검색",
        },
        labels: {
          style: {
            colors: ["#424f5e"],
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
        theme: "dark",
      },
    },
  });

  useEffect(() => {
    if (result) {
      console.log(result)
      setChartData(prevState => {
        const updatedHook = {...prevState}
        if (Object.keys(updatedHook).length) {
          updatedHook.series[0].data = result.map(row => row.male)
          updatedHook.series[1].data = result.map(row => row.female)
          updatedHook.series[2].data = result.map(row => row.other)
        }
        return updatedHook
        
      })
    }
  }, [result])

  return (
    <Box sx={{ height: "100%" }}>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height="100%"
      />
    </Box>
  );
};

const SearchTrendByPeriodChart = ({result}) => {
  const handleChartCreated = (chart) => {
    chart.container.classList.add("apexcharts-draw-animation");
  };

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "line-chart",
        zoom: {
          enabled: false,
        },

        animations: animationConfig,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: 3,
      },
      markers: {
        size: 6,
        colors: "#0b1827",
        strokeWidth: 2,
        strokeColors: "#0980df",
      },

      grid: {
        borderColor: "#424f5e",
        strokeDashArray: 5,
        position: "back",
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
            style: {
              colors: "#424f5e",
              type: "dotted",
            },
          },
        },
      },
      xaxis: {
        categories: [
          "2022/04",
          "2022/05",
          "2022/06",
          "2022/07",
          "2022/08",
          "2022/09",
          "2022/10",
          "2022/11",
          "2022/12",
          "2023/01",
          "2023/02",
          "2023/03",
        ],
        labels: {
          style: {
            colors: [
              "#424f5e",
              "#424f5e",
              "#424f5e",
              "#424f5e",
              "#424f5e",
              "#424f5e",
              "#424f5e",
              "#424f5e",
              "#424f5e",
              "#424f5e",
              "#424f5e",
              "#424f5e",
            ],
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: ["#424f5e"],
          },
        },
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val) => {
            return "$" + val;
          },
        },
        marker: {
          show: true,
        },
        theme: "dark",
      },
    },

    series: [
      {
        name: "count",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 150, 200, 220],
      },
    ],
  });

  useEffect(() => {
    if (result) {
      setChartData(prevState => {
        const updatedHook = {...prevState}
  
        if (Object.keys(updatedHook).length) {
          updatedHook.options.xaxis.categories = result.map(row => row.date)
          updatedHook.series[0].data = result.map(row => row.count)
        }
        return updatedHook
        
      })
    }
    
  }, [result])

  return (
    <Box sx={{ height: "100%" }}>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height="100%"
      />
    </Box>
  );
};

const SearchByGenderChart = ({result}) => {
  const [chartData, setChartData] = useState({
    series: [result['male']['count'], result['female']['count'], result['others']['count']],
    options: {
      chart: {
        type: "donut",
        offsetY: 0,
        animations: animationConfig,
        toolbar: {
          show: false,
        },
      },

      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
        style: {
          color: "red",
        },
      },
      labels: ["남성", "여성", "기타"],
      colors: ["#008FFB", "#FF4560", "#354050"],
      legend: {
        show: false,
        position: "left",
        offsetY: 20,
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: false,
            },

            size: "80%",
          },
        },
      },
    },
  });

  return (
    <Box sx={{ height: "100%", display: "flex", alignItems: "flex-end" }}>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        height="100%"
      />
    </Box>
  );
};

const SearchTrendWeeklyChart = ({ sx }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "검색 수",
        data: [30, 40, 90, 50, 49, 60, 30],
      },
    ],
    options: {
      chart: {
        id: "column-chart",
        animations: animationConfig,
        toolbar: {
          show: false,
        },
      },

      xaxis: {
        categories: ["월", "화", "수", "목", "금", "토", "일"],
        howAxisLines: false,
        labels: {
          show: false, // set show to false to hide the x-axis labels
        },
        axisTicks: {
          show: false,
        },
      },
      grid: {
        show: false,
      },
      yaxis: {
        title: "",
        labels: {
          show: false, // set show to false to hide the x-axis labels
        },
      },
      plotOptions: {
        bar: {
          colors: {
            backgroundBarColors: ["gray"],
            backgroundBarRadius: 5,
          },

          horizontal: false,
          endingShape: "rounded",
          columnWidth: "30%",
          barWidth: "10%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " 회 검색";
          },
        },
        theme: "dark",
      },
    },
  });

  return (
    <Box sx={{ height: "100%", ...sx }}>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height="100%"
      />
    </Box>
  );
};

const SearchDownloadRatioChart = ({result, keyword}) => {

  const [chartData, setChartData] = useState({
    series: [70],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
        animations: animationConfig,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%",
          },
          track: {
            background: "#242e3c",
            borderRadius: "10px",
          },
        },
      },
      labels: ["다운로드 비율"],
    },
  });

  useEffect(() => {
    if (result) {
      setChartData(prevState => {
        const updatedHook = {...prevState}
        if (Object.keys(updatedHook).length) {
          updatedHook.series[0] = result.ratio
        }
        return updatedHook
        
      })
    }
  }, [result])

  return (
    <Box sx={{ height: "75%" }}>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="radialBar"
        height="100%"
      />

      <Box sx={{ textAlign: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckIcon
            sx={{ marginRight: "3px", color: "rgb(0,210,122)" }}
          />
          <p style={{ margin: 0, fontSize: "16px" }}>
            현재 "{keyword}" 키워드는 적절합니다.
          </p>
        </Box>

        <p style={{ fontSize: "12px" }}>전체 검색 {result.searches_count}건중 {result.downloads_count}건 다운로드</p>
      </Box>
      </Box>
    
  );
};

const GenderCard = ({result}) => {
  return (
    <Grid container>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "5px",
          width: "100%",
          padding: "5px 0px 20px 0px",
          color: "rgb(157,169,187)",
          fontSize: "12px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                bgcolor: "#008FFB",
                borderRadius: "50%",
                height: "10px",
                width: "10px",
                marginRight: "6px",
              }}
            />
            <span>남성</span>
          </Box>
          <span>{result['male']['ratio']}%</span>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                bgcolor: "#FF4560",
                borderRadius: "50%",
                height: "10px",
                width: "10px",
                marginRight: "6px",
              }}
            />
            <span>여성</span>
          </Box>
          <span>{result['female']['ratio']}%</span>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                bgcolor: "#354050",
                borderRadius: "50%",
                height: "10px",
                width: "10px",
                marginRight: "6px",
              }}
            />
            <span>기타</span>
          </Box>
          <span>{result['others']['ratio']}%</span>
        </Box>
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={5}>
        <SearchByGenderChart result={result}/>
      </Grid>
    </Grid>
  )
}

const OverviewChart = ({isLoading, statisticsData, keyword, handleReload, isRandom, setRandom}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      {isLoading ? null : 
      <Grid container sx={{ width: "81%" }}>
        <Grid item xs={12} sx={{padding:"0px 10px"}}>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<RefreshIcon />} onClick={()=>{handleReload();}}>
              새로고침
            </Button>
            {
              isRandom ? 
              <Button variant="outlined" startIcon={<CloudOffIcon />} onClick={() => {setRandom(false);}} >랜덤 데이터</Button> : 
              <Button variant="contained" startIcon={<CloudDoneIcon />} onClick={() => {setRandom(true);}}>실제 데이터</Button>
            }
            
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} xl={3} sx={{ padding: "10px" }}>
          {/* SearchTrendWeeklyChart */}
          <ChartCard
            isSmallCard
            title="일주일간 검색추이"
            sx={{ height: "150px", paddingTop: "0px" }}
          >
            {
              statisticsData && statisticsData.gender && statisticsData.gender.result ? 
              <Grid container>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <span style={{ fontSize: "30px" }}>125회</span>
                <Chip
                  label="+13%"
                  size="small"
                  style={{
                    backgroundColor: "#022b18",
                    color: "#5ce2aa",
                    fontSize: "12px",
                    marginTop: "5px",
                    width: "50px",
                  }}
                />
              </Grid>
              <Grid item xs={8}>
                <SearchTrendWeeklyChart sx={{ height: "90%" }} />
              </Grid>
            </Grid> :
              <LoadingBox/>
            }
            
          </ChartCard>
        </Grid>
        <Grid item xs={12} md={6} xl={3} sx={{ padding: "10px" }}>
          {/* SearchByGenderChart */}
          <ChartCard
            isSmallCard
            title="성별별 검색수"
            sx={{ height: "150px", paddingTop: "0px" }}
          >
            {
              statisticsData && statisticsData.gender && statisticsData.gender.result ? 
              <GenderCard result={statisticsData.gender.result}/> :
              <LoadingBox/>
            }
          </ChartCard>
        </Grid>
        <Grid item xs={12} md={6} xl={3} sx={{ padding: "10px" }}>
          {/* SearchSatisfaction */}
          <ChartCard
            isSmallCard
            title="검색 결과 만족도"
            sx={{ height: "150px", paddingTop: "0px" }}
          >
            {
              statisticsData && statisticsData.satisfaction && statisticsData.satisfaction.result ? 
              <SafisfactionShowTable result={statisticsData.satisfaction.result}/> :
              <LoadingBox/>
            }
          </ChartCard>
        </Grid>
        <Grid item xs={12} md={6} xl={3} sx={{ padding: "10px" }}>
          {/* SearchSatisfaction */}
          <ChartCard
            isSmallCard
            title="만족도 투표"
            sx={{ height: "150px", paddingTop: "0px" }}
          >
            <SatisfactionVoteTable />
          </ChartCard>
        </Grid>

        <Grid item xs={12} lg={6} sx={{ padding: "10px" }}>
          <TableCard title="유사 키워드" sx={{ height: "330px" }}>
            {/* KeywordTable */}
            {
              statisticsData && statisticsData.similarKeywords && statisticsData.similarKeywords.result ? 
              <KeywordTable result={statisticsData.similarKeywords.result}/> :
              <LoadingBox/>
            }
          </TableCard>
        </Grid>
        <Grid item xs={12} lg={6} sx={{ padding: "10px" }}>
          {/* SearchTrendByPeriodChart */}
          <ChartCard title="기간별 검색 추이" sx={{ height: "300px" }}>
            {
              statisticsData && statisticsData.monthlyTrend && statisticsData.monthlyTrend.result ? 
              <SearchTrendByPeriodChart result={statisticsData.monthlyTrend.result}/> :
              <LoadingBox/>
            }
          </ChartCard>
        </Grid>

        <Grid item xs={12} lg={3} sx={{ padding: "10px" }}>
          <TableCard title="비디오 정보" sx={{ height: "280px" }}>
            {/* VideoInfoTable */}
            {
              statisticsData && statisticsData.relatedVideos && statisticsData.relatedVideos.result ? 
              <VideoTable result={statisticsData.relatedVideos.result}/> :
              <LoadingBox/>
            }
          </TableCard>
        </Grid>
        <Grid item xs={12} lg={6} sx={{ padding: "10px" }}>
          <ChartCard title="연령대별 검색 횟수" sx={{ height: "250px" }}>
            {/* SearchCountByAgeGroupChart */}
            {
              statisticsData && statisticsData.age && statisticsData.age.result ? 
              <SearchCountByAgeGroupChart result={statisticsData.age.result}/> :
              <LoadingBox/>
            }
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={3} sx={{ padding: "10px" }}>
          {/* SearchDownloadRatioChart */}
          <ChartCard title="검색 대비 다운로드 비율" sx={{ height: "250px" }}>
            {
              statisticsData && statisticsData.download && statisticsData.download.result ? 
              <SearchDownloadRatioChart result={statisticsData.download.result} keyword={keyword}/> :
              <LoadingBox/>
            }
          </ChartCard>
        </Grid>
      </Grid>}
      
    </div>
  );
};

export default OverviewChart;
