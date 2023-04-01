import React, { useState } from "react";
import Chart from "react-apexcharts";

import { Box, Grid } from "@mui/material";
import ChartCard from "./ChartCard";

const ColumnChart = () => {
  const chartData = {
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
          text: "Sales (in thousands)",
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
  };

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

const LineChart = () => {
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

const DonutChart = () => {
  const chartData = {
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
        position: "bottom",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
          },
        },
      },
    },
  };

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
          <ChartCard small_title="일주일간 검색추이" sx={{ height: "100px" }}>
            abc
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={3} sx={{ padding: "10px" }}>
          <ChartCard small_title="성별별 검색수" sx={{ height: "100px" }}>
            123
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={6} sx={{ padding: "10px" }}>
          <ChartCard small_title="검색 결과 만족도" sx={{ height: "100px" }}>
            abc123
          </ChartCard>
        </Grid>

        <Grid item xs={12} lg={6} sx={{ padding: "10px" }}>
          <ChartCard
            big_title="유사 키워드"
            sx={{ height: "300px" }}
          ></ChartCard>
        </Grid>
        <Grid item xs={12} lg={6} sx={{ padding: "10px" }}>
          <ChartCard big_title="기간별 검색 추이" sx={{ height: "300px" }}>
            <ColumnChart />
          </ChartCard>
        </Grid>

        <Grid item xs={12} lg={2} sx={{ padding: "10px" }}>
          <ChartCard big_title="비디오 정보">
            <DonutChart />
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={8} sx={{ padding: "10px" }}>
          <ChartCard big_title="연령대 검색 횟수">
            <LineChart />
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={2} sx={{ padding: "10px" }}>
          <ChartCard big_title="검색 대비 다운로드 비율">
            <DonutChart />
          </ChartCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default OverviewChart;
