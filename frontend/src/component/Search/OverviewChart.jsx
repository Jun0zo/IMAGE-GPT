import React, { useState, useRef } from "react";
import Chart from "react-apexcharts";

import { Box, Grid, Chip } from "@mui/material";
import ChartCard from "./ChartCard";
import TableCard from "./TableCard";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "styles/chart-animation.css";

import good from "images/good.svg";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
];

const rows2 = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
];

const animationConfig = {
  enabled: true,
  easing: "easeinout",
  speed: 3000, // Change this to adjust the animation speed
  animateGradually: {
    enabled: true,
    delay: 150, // Change this to adjust the delay between animations
  },
};

const KeywordTable = () => {
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
          {rows.map((row) => (
            <TableRow
              key={row.name}
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
                }}
              >
                {row.name}
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "#e2e2e2", borderBottom: "1px solid #242e3c" }}
              >
                {row.calories}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const VideoTable = () => {
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
              Dessert (100g serving)
            </TableCell>
            <TableCell
              align="right"
              sx={{ color: "#e2e2e2", borderBottom: "1px solid #242e3c" }}
            >
              Calories
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows2.map((row) => (
            <TableRow
              key={row.name}
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
                }}
              >
                {row.name}
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "#e2e2e2", borderBottom: "1px solid #242e3c" }}
              >
                {row.calories}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const SafisfactionShowTable = () => {
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
            <span>좋아요 비율 : 32%</span>
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
            31
          </span>
          <span style={{ fontSize: "14px" }}>31 / 3212</span>
        </Box>
      </Box>
    </Box>
  );
};

const SatisfactionVoteTable = () => {
  return null;
};

const SearchCountByAgeGroupChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Sales",
        data: [30, 40, 200, 50, 49, 60, 10],
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
        categories: ["10대", "20대", "30대", "40대", "50대", "60대", "70대"],

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
      grid: {
        show: false,
      },
      yaxis: {
        title: {
          text: "Search Count",
        },
        labels: {
          style: {
            colors: ["#424f5e"],
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: "rounded",
          columnWidth: "55%",
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
            return "$ " + val + " thousands";
          },
        },
      },
    },
  });

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

const SearchTrendByPeriodChart = () => {
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
        stroke: {
          show: false,
        },
        animations: animationConfig,
        toolbar: {
          show: false,
        },
      },
      fill: {
        type: "solid",
        colors: ["#F44336", "#E91E63", "#9C27B0"],
      },

      grid: {
        show: false,
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
    },
    series: [
      {
        name: "Sales",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 150, 200, 220],
      },
    ],
  });

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

const SearchByGenderChart = () => {
  const [chartData, setChartData] = useState({
    series: [44, 55],
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
      labels: ["남성", "여성"],
      colors: ["#008FFB", "#FF4560"],
      legend: {
        show: false,
        position: "left",
        offsetY: 20,
      },
      plotOptions: {
        pie: {
          donut: {
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
        name: "Sales",
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
        categories: ["월", "화", "수", "40대", "50대", "60대", "70대"],
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
            return "$ " + val + " thousands";
          },
        },
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

const SearchDownloadRatioChart = () => {
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
        },
      },
      labels: ["Cricket"],
    },
  });

  return (
    <Box sx={{ height: "90%" }}>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="radialBar"
        height="100%"
      />
    </Box>
  );
};

const OverviewChart = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      <Grid container sx={{ width: "81%" }}>
        <Grid item xs={6} lg={3} sx={{ padding: "10px" }}>
          {/* SearchTrendWeeklyChart */}
          <ChartCard
            isSmallCard
            title="일주일간 검색추이"
            sx={{ height: "150px", paddingTop: "0px" }}
          >
            <Grid container>
              <Grid item xs={4} sx={{ padding: "30px 0px" }}>
                <span style={{ fontSize: "40px" }}>125회</span>
                <Chip
                  label="+13%"
                  size="small"
                  style={{
                    backgroundColor: "#022b18",
                    color: "#5ce2aa",
                    fontSize: "12px",
                    marginTop: "5px",
                  }}
                />
              </Grid>
              <Grid item xs={8}>
                <SearchTrendWeeklyChart sx={{ height: "90%" }} />
              </Grid>
            </Grid>
          </ChartCard>
        </Grid>
        <Grid item xs={6} lg={3} sx={{ padding: "10px" }}>
          {/* SearchByGenderChart */}
          <ChartCard
            isSmallCard
            title="성별별 검색수"
            sx={{ height: "150px", paddingTop: "0px" }}
          >
            <Grid container>
              <Grid item xs={8}>
                <Box>231</Box>
                <Box>231</Box>
                <Box>231</Box>
              </Grid>
              <Grid item xs={4}>
                <SearchByGenderChart />
              </Grid>
            </Grid>
          </ChartCard>
        </Grid>
        <Grid item xs={6} lg={3} sx={{ padding: "10px" }}>
          {/* SearchSatisfaction */}
          <ChartCard
            isSmallCard
            title="검색 결과 만족도"
            sx={{ height: "150px", paddingTop: "0px" }}
          >
            <SafisfactionShowTable />
          </ChartCard>
        </Grid>
        <Grid item xs={6} lg={3} sx={{ padding: "10px" }}>
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
            <KeywordTable />
          </TableCard>
        </Grid>
        <Grid item xs={12} lg={6} sx={{ padding: "10px" }}>
          {/* SearchTrendByPeriodChart */}
          <ChartCard title="기간별 검색 추이" sx={{ height: "300px" }}>
            <SearchTrendByPeriodChart />
          </ChartCard>
        </Grid>

        <Grid item xs={12} lg={3} sx={{ padding: "10px" }}>
          <TableCard title="비디오 정보" sx={{ height: "280px" }}>
            {/* VideoInfoTable */}
            <VideoTable />
          </TableCard>
        </Grid>
        <Grid item xs={12} lg={6} sx={{ padding: "10px" }}>
          <ChartCard title="연령대별 검색 횟수" sx={{ height: "250px" }}>
            {/* SearchCountByAgeGroupChart */}
            <SearchCountByAgeGroupChart />
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={3} sx={{ padding: "10px" }}>
          {/* SearchDownloadRatioChart */}
          <ChartCard title="검색 대비 다운로드 비율" sx={{ height: "250px" }}>
            <SearchDownloadRatioChart />
          </ChartCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default OverviewChart;
