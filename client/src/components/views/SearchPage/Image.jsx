import React from 'react';
import { Col } from 'react-bootstrap';

const Image = ({ img }) => {
  return (
    <Col className="col-3">
      <img src={img}/>
    </Col>
  )
}

export default Image;