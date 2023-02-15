import React, { useContext } from 'react'
import { CommentContext } from './PostView';
import Comment from './Comment';

const CommentList = () => {
  const { commentData } = useContext(CommentContext);
  return (
    <div>
      {Array(Math.ceil(commentData.length>10?10:commentData.length)).fill().map((tr, i) => <Comment rowIndex={i} />)} 
    </div>
  )
}

export default CommentList
