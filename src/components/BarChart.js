import React, { useState, useEffect } from 'react';
// import { Chart } from "frappe-charts/dist/frappe-charts.min.esm"
import ReactFrappeChart from "react-frappe-charts";


// const generateChart = () => {

//     var a = new Chart("#chart", {
//         // or DOM element
//         data: {
//           labels: [
//             "12am-3am",
//             "3am-6am",
//             "6am-9am",
//             "9am-12pm",
//             "12pm-3pm",
//             "3pm-6pm",
//             "6pm-9pm",
//             "9pm-12am"
//           ],
      
//           datasets: [
//             {
//               name: "Some Data",
//               chartType: "bar",
//               values: [25, 40, 30, 35, 8, 52, 17, -4]
//             },
//             {
//               name: "Another Set",
//               chartType: "bar",
//               values: [25, 50, -10, 15, 18, 32, 27, 14]
//             },
//             {
//               name: "Yet Another",
//               chartType: "line",
//               values: [15, 20, -3, -15, 58, 12, -17, 37]
//             }
//           ],
      
//           yMarkers: [{ label: "Marker", value: 70, options: { labelPos: "left" } }],
//           yRegions: [
//             { label: "Region", start: -10, end: 50, options: { labelPos: "right" } }
//           ]
//         },
      
//         title: "My Awesome Chart",
//         type: "axis-mixed", // or 'bar', 'line', 'pie', 'percentage'
//         height: 300,
//         colors: ["purple", "#ffa3ef", "light-blue"],
//         axisOptions: {
//           xAxisMode: "tick",
//           xIsSeries: true
//         },
//         barOptions: {
//           stacked: false,
//           spaceRatio: 0.5
//         },
//         tooltipOptions: {
//           formatTooltipX: (d) => (d + "").toUpperCase(),
//           formatTooltipY: (d) => d + " pts"
//         }
//       });

//     return a;  
// }



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
            data={{
            labels: ["Nov. 14", "Dec. 15", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [{ values: [18, 40, 30, 35, 8, 52, 17, 4] }]
            }}
            animate={true}
      />
    )

}

export default BarChart;