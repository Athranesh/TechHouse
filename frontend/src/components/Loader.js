import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ width, height }) => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: width || '100px',
        height: height || '100px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;
