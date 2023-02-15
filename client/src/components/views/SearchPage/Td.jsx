import React, { useContext, memo } from 'react';
import { TableContext } from './SearchPage';
import { Col } from 'react-bootstrap';

const Td = memo(({ rowIndex, colIndex }) => {
  const { tableData } = useContext(TableContext);
  const Url = '../../../../../Images/Crawling/';
  const name = (tableData[3*rowIndex + colIndex*1]===undefined)?null:tableData[3*rowIndex + colIndex*1].file_name;
  const hrefLink = (tableData[3*rowIndex + colIndex*1]===undefined)?null:tableData[3*rowIndex + colIndex*1].page_url;

  return (
    <Col className="mb-3 mt-3">
      <a href={hrefLink} target="_blank">
        {name && <div className="img-frame"><img src={Url+name}  width="100%" className="result-image"/></div>}
      </a>
    </Col>
  );
});

export default Td;