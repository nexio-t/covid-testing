import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children, className, type }) => {

  console.log("children is: ", children); 
  console.log("className is: ", className); 
  console.log("type is: ", type);
  
  let containerClassName = 'container';

  if ( typeof type === 'string' ) {
    containerClassName = `${containerClassName} container-${type}`;
    console.log("Container.js first one is: ", containerClassName); 
  }

  if ( typeof className === 'string' ) {
    containerClassName = `${containerClassName} ${className}`;
    console.log("Container.js first one is: ", containerClassName); 
  }

  console.log("containerClassName is: ", containerClassName); 

  return <div className={containerClassName}>{ children }</div>;
};

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Container;
