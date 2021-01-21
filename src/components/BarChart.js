import React, { useState, useEffect } from "react";
import ReactFrappeChart from "react-frappe-charts";

function BarChart({ data }) {
  return (
    <ReactFrappeChart
      type="bar"
      colors={["#B21B1D"]}
      axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
      height={200}
      barOptions={{ spaceRatio: 0.6 }}
      isNavigable={true}
      data={data}
      animate={true}
    />
  );
}

export default BarChart;
