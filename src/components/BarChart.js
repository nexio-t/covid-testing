import React, { useState, useEffect } from 'react';
// import { Chart } from "frappe-charts/dist/frappe-charts.min.esm"
import ReactFrappeChart from "react-frappe-charts";


function BarChart({ data }) {

    console.log("data is: ", data); 

    // prep data 
    // https://www.freecodecamp.org/news/reduce-f47a7da511a9/
    // good example of how to map over data: https://github.com/rhsin/NFL-Stats/blob/0fd5810618f27711ed273ad30f94b76576960158/ClientApp/src/components/PlayerChart.js
    // https://github.com/ayushnpatel/Weighty/blob/b3635be620d60391e724d3e28018df6f7c03192f/src/components/Graph.js
    // https://github.com/ecomloop/rantum.dev/blob/3004cb98748e5d168089ec64ecd60ebd2b032281/src/templates/countydata-template.js

    return (
        <ReactFrappeChart
            type="bar"
            colors={["#B21B1D"]}
            axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
            height={200}
            barOptions={{spaceRatio: 0.6}}
            isNavigable={true}
            // data={{
            // labels: ["Nov. 14", "Dec. 15", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            // datasets: [{ values: [18, 40, 30, 35, 8, 52, 17, 4] }]
            // }}
            data={data}
            animate={true}
      />
    )

}

export default BarChart;