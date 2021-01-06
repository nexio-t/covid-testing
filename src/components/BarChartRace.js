import React, { useState, useEffect } from 'react';
// import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryChart, VictoryBar, Bar } from 'victory';

function BarChartRace({ data }) {

    // will be called initially and on every data change

    const [style, setStyle] = useState({ data: { fill: "tomato" } });
    const [clicked, setClicked] = useState(false);


    const handleMouseOver = () => {
        
        console.log("handleMouseOver called"); 
        console.log("clicke is: ", clicked); 

        

        console.log("isClicked", isClicked); 

       
       
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

    useEffect(() => {
        
    
        const isClicked = !clicked;
        setClicked(isClicked);
        setStyle({data: { fill: fillColor }})
        const fillColor = clicked ? "blue" : "tomato";


    }, [clicked, data]);
  
    return (
       <div>
        <VictoryChart height={400} width={400}
          domainPadding={{ x: 50, y: [0, 20] }}
          scale={{ x: "time" }}
        >
          <VictoryBar
            dataComponent={
              <Bar events={{ onMouseOver: handleMouseOver }}/>
            }
            style={style}
            data={[
              { x: new Date(1986, 1, 1), y: 2 },
              { x: new Date(1996, 1, 1), y: 3 },
              { x: new Date(2006, 1, 1), y: 5 },
              { x: new Date(2016, 1, 1), y: 4 }
            ]}
          />
        </VictoryChart>
      </div>
    );
}

export default BarChartRace;