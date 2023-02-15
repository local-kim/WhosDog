/*global kakao*/ 
import React, { useContext } from 'react'
import { ReviewContext } from './ReviewForm';
import Review from './Review';

const ReviewList = () => {
  const { reviewData } = useContext(ReviewContext);

  return (
    <ul>
    {reviewData!==undefined?
      Array(Math.ceil(reviewData.length>10?10:reviewData.length)).fill().map((tr, i) => <Review rowIndex={i} />)
    :null}
    </ul>
  )
}

export default ReviewList;