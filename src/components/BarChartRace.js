import React, { useState, useEffect } from "react";
// import React from 'react';
import ReactDOM from "react-dom";
import {
  VictoryAxis,
  VictoryTheme,
  VictoryChart,
  VictoryBar,
  VictoryLabel,
  Bar,
} from "victory";

function BarChartRace({ data }) {
  // will be called initially and on every data change

  const [style, setStyle] = useState({
    data: { fill: "tomato", fontSize: 4 },
    labels: {
      fontSize: 4,
    },
  });
  const [clicked, setClicked] = useState(false);

  const handleMouseOver = () => {
    // console.log("handleMouseOver called");
    // console.log("clicke is: ", clicked);

    // console.log("isClicked", isClicked);

    const isClicked = !clicked;
    console.log("isClicked2 is: ", isClicked);
    setClicked(isClicked);
    const fillColor = clicked ? "blue" : "tomato";
    console.log("fillColor is: ", fillColor);
    setStyle({ data: { fill: fillColor } });

    // this.setState({
    //   clicked,
    //   style: {
    //     data: { fill: fillColor }
    //   }
    // });
  };

  // There's another way to handle the on mouse over: https://upmostly.com/tutorials/react-onhover-event-handling-with-examples
  // To do includes:
  // re-read react hook docs
  // Handle mouse over
  // Begin incorporating data (see how it looks)
  // Change size of graph
  // Then add the other graphs
  // https://github.com/FormidableLabs/victory-tutorial/blob/9bf170061599027e4bd5fcf8128e47adb83c0e98/src/js/client.js
  // https://formidable.com/open-source/victory/docs/

  useEffect(() => {}, [data]);

  return (
    <div>
      <VictoryChart
        height={150}
        width={150}
        theme={VictoryTheme.material}
        domainPadding={{ x: 10, y: [0, 10] }}
        scale={{ x: "time" }}
      >
        <VictoryAxis
          dependentAxis={true}
          style={{
            grid: { stroke: "grey" },
            tickLabels: { fontSize: 3, padding: 5 },
            tickCount: 10,
          }}
        />
        <VictoryAxis
          // tickFormat={(x) => ``}
          style={{
            grid: { stroke: "grey" },
            tickLabels: { fontSize: 3, padding: 4 },
          }}
        />
        <VictoryBar
          dataComponent={<Bar events={{ onMouseOver: handleMouseOver }} />}
          style={style}
          alignment="start"
          data={[
            { x: new Date(1, 1, 1), y: 2 },
            { x: new Date(2, 1, 1), y: 3 },
            { x: new Date(3, 1, 1), y: 5 },
            { x: new Date(4, 1, 1), y: 4 },
          ]}
        />
      </VictoryChart>

      {/* <svg height={150} width={200}> */}
      <VictoryChart
        height={150}
        width={200}
        domainPadding={10}
        // theme={VictoryTheme.material}
        // domainPadding={{ x: 10, y: [0, 10] }}
        // scale={{ x: "time" }}
      >

    {/* {
        ["day 1", "day 2", "day 3", "day 4", "day 5", "day 6", "day 7",].map((d, i) => {
          return (
            <VictoryAxis dependentAxis
              key={i}
              label={d}
              style={{ tickLabels: { fill: "none", fontSize: 2, padding: 0 } }}
              axisValue={d}
            />
          );
        })
    } */}

          <VictoryAxis
            label="Novel Covid Cases"
            dependentAxis={true}
            style={{
              tickLabels: { fontSize: 4, padding: 5 },
              // tickLabelComponent={{angle: 40}}
            }}
            axisLabelComponent={<VictoryLabel fontSize={4} dy={1.2}/>}
            
            // tickLabelComponent={<VictoryLabel dx={-1.5}/>}
            // tickLabelComponent={<VictoryLabel dx={9} />}
            // axisLabelComponent={<VictoryLabel dy={-0.5}/>}
          />
          <VictoryAxis
            style={{
              tickLabels: { fontSize: 4, padding: 5 },
            }}
            tickLabelComponent={<VictoryLabel angle={-45} dx={-2} />}
          />
          <VictoryBar
            // categories={{
            //   x: [
            //     "day 1",
            //     "day 2",
            //     "day 3",
            //     "day 4",
            //     "day 5",
            //     "day 6",
            //     "day 7",
            //   ],
            // }}
            data={[
              { x: "day 1", y: 1 },
              { x: "day 2", y: 2 },
              { x: "day 3", y: 3 },
              { x: "day 4", y: 2 },
              { x: "day 5", y: 1 },
              { x: "day 6", y: 1 },
              { x: "day 7", y: 1 },
            ]}
          />
      </VictoryChart>
      {/* </svg> */}
      
    </div>
  );
}

export default BarChartRace;