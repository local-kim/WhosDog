import React, {  memo } from 'react';
import { Row } from 'react-bootstrap';
import Td from './Td';

const Tr = memo(({ rowIndex }) => {
  return (
    <Row>
      <Td rowIndex= {rowIndex} colIndex='0' />
      <Td rowIndex= {rowIndex} colIndex='1' />
      <Td rowIndex= {rowIndex} colIndex='2' />
    </Row>
  )
})

export default Tr;