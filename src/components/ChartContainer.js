import React from 'react';
import PropTypes from 'prop-types';

const ChartContainer = ({ children, className, type }) => {
  
  let containerClassName = 'chart-container';

  if ( typeof type === 'string' ) {
    containerClassName = `${containerClassName} container-${type}`;
  }

  if ( typeof className === 'string' ) {
    containerClassName = `${containerClassName} ${className}`;
  }

  return <div className={containerClassName}>{ children }</div>;
};

ChartContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default ChartContainer;
