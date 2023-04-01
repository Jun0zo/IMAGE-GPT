import React, { useState, useRef } from "react";
import Chart from "react-apexcharts";

import { Box, Grid } from "@mui/material";
import ChartCard from "./ChartCard";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
];

const KeywordTable = () => {
  return (
    <TableContainer
      sx={{ height: "100%", backgroundColor: "#0e1117" }}
      component={Paper}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "white" }}>
              Dessert (100g serving)
            </TableCell>
            <TableCell align="right" sx={{ color: "white" }}>
              Calories
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
              <TableCell component="th" scope="row" sx={{ color: "white" }}>
                {row.name}
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                {row.calories}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
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
      },

      xaxis: {
        categories: ["10대", "20대", "30대", "40대", "50대", "60대", "70대"],
      },
      grid: {
        show: false,
      },
      yaxis: {
        title: {
          text: "Search Count",
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
      },

      grid: {
        show: false,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
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
        position: "left",
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
    <Box sx={{ height: "100%" }}>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        height="100%"
      />
    </Box>
  );
};

const SearchTrendWeeklyChart = () => {
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

const SearchDownloadRatioChart = () => {
  const [chartData, setChartData] = useState({
    series: [70],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
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
        <Grid item xs={12} lg={3} sx={{ padding: "10px" }}>
          {/* SearchTrendWeeklyChart */}
          <ChartCard small_title="일주일간 검색추이" sx={{ height: "100px" }}>
            <SearchTrendWeeklyChart />
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={3} sx={{ padding: "10px" }}>
          {/* SearchByGenderChart */}
          <ChartCard small_title="성별별 검색수" sx={{ height: "100px" }}>
            <SearchByGenderChart />
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={6} sx={{ padding: "10px" }}>
          {/* SearchSatisfaction */}
          <ChartCard small_title="검색 결과 만족도" sx={{ height: "100px" }}>
            abc123
          </ChartCard>
        </Grid>

        <Grid item xs={12} lg={6} sx={{ padding: "10px" }}>
          <ChartCard big_title="유사 키워드" sx={{ height: "300px" }}>
            {/* KeywordTable */}
            <KeywordTable />
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={6} sx={{ padding: "10px" }}>
          {/* SearchTrendByPeriodChart */}
          <ChartCard big_title="기간별 검색 추이" sx={{ height: "300px" }}>
            <SearchTrendByPeriodChart />
          </ChartCard>
        </Grid>

        <Grid item xs={12} lg={3} sx={{ padding: "10px" }}>
          <ChartCard big_title="비디오 정보" sx={{ height: "250px" }}>
            {/* VideoInfoTable */}
            <KeywordTable />
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={6} sx={{ padding: "10px" }}>
          <ChartCard big_title="연령대별 검색 횟수" sx={{ height: "250px" }}>
            {/* SearchCountByAgeGroupChart */}
            <SearchCountByAgeGroupChart />
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={3} sx={{ padding: "10px" }}>
          {/* SearchDownloadRatioChart */}
          <ChartCard
            big_title="검색 대비 다운로드 비율"
            sx={{ height: "250px" }}
          >
            <SearchDownloadRatioChart />
          </ChartCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default OverviewChart;
