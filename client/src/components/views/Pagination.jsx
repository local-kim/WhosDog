import React, {useEffect, useState} from 'react'

const Pagination = ({currentPage,postsPerPage,totalPosts,paginate}) => {
  const [pageNumber,setPageNumber] = useState([]);
  
  useEffect(() => {
    for(let i=0; i<Math.ceil(totalPosts/postsPerPage);i++){
      setPageNumber(prevState => {
       return [...prevState, i];
     })
    }
  }, [totalPosts])

  
  return (
    <div>
      {
        pageNumber.map(number => (
          <div className={number==currentPage?'pageClicked':'pageBtn'} 
          onClick={() => paginate(number)}
          >{number+1}</div>
        ))
      }
    </div>
  ) 
}

export default Pagination
