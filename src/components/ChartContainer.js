import React from 'react';
import PropTypes from 'prop-types';

const ChartContainer = ({ children, className, type }) => {

  console.log("chartContinaer called"); 
  
  let containerClassName = 'chart-container';

  if ( typeof type === 'string' ) {
    containerClassName = `${containerClassName} container-${type}`;
  }

  if ( typeof className === 'string' ) {
    containerClassName = `${containerClassName} ${className}`;
  }

  console.log("ChartContainer.js containerClassName is: ", containerClassName); 

  console.log("right before the return : ", <div className={containerClassName}>{ children }</div>)
  return <div className={containerClassName}>{ children }</div>;
};

ChartContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default ChartContainer;
