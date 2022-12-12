import React from 'react';
import { Spinner } from 'react-bootstrap';
import './ShowSpinner.css';

const ShowSpinner = () => {
  return (
    <Spinner
      className="container__spinner"
      animation="border"
      variant="secondary"
    />
  );
};

export default ShowSpinner;
