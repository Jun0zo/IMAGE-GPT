import React, { useState } from "react";
import Chart from "react-apexcharts";

import { Box, Grid } from "@mui/material";

const LineChart = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "line-chart",
        zoom: {
          enabled: false,
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
    <div className="line-chart">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

const OverviewChart = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Grid container sx={{ width: "81%" }}>
        <Grid xs={8}>
          <LineChart />
        </Grid>
        <Grid xs={4}>fdsaf</Grid>
      </Grid>
    </div>
  );
};

export default OverviewChart;
