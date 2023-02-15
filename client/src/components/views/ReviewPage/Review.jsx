import React, { useContext } from 'react';
import { ReviewContext } from './ReviewForm';
import Stars from './Stars';

const Review = ({ rowIndex }) => {
  const { reviewData } = useContext(ReviewContext);

  return (
    <li style={{"list-style":"none"}}>
      <div className="card"> 
        <div className="header">
          <div className="col-3 nickname">{reviewData[rowIndex].User.nick}</div> 
          <div className="col-4 star"><Stars avg={reviewData[rowIndex].star} edit={false}/></div>
          <div className="col-5 date">{reviewData[rowIndex].createdAt.split('T')[0]}</div>
        </div>
        <div className="reviewcontent">

          {reviewData[rowIndex].review}
        </div>
      </div>
    </li>
  )
}

export default Review;