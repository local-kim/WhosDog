import React, { memo, useContext } from 'react';
import Tr from './Tr';
import { TableContext } from './SearchPage';
import { Container } from 'react-bootstrap';

const Table = memo(() => {
  const { tableData } = useContext(TableContext);
  return ( tableData.length!==0?
    <div className="container-custom">
      {Array(Math.ceil(tableData.length/3)).fill().map((tr, i) => <Tr rowIndex={i} />)}   
    </div> : <div className="noMatch">매칭되는 결과가 없습니다.</div>
  )
});

export default Table;