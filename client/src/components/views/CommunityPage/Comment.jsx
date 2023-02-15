import React, { useContext } from 'react'
import { CommentContext } from './PostView';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../../_action/post_action';
const Comment = ({rowIndex}) => {
  const { commentData } = useContext(CommentContext);
  const user = useSelector( state => ({
    Id : state.post.user.id
}));
  const dispatch = useDispatch();
  
  const onClickHandler = () => {
    console.log(user.Id);
    dispatch(deleteComment(commentData[rowIndex].id))
    .then(() => {
      window.location.reload()
    })
  }

  return (
    <div className="comment">
      <header>
        <div className="nick pl-2"><h6>{commentData[rowIndex].User.nick}</h6></div>
        <div className="date pr-2">{commentData[rowIndex].createdAt.split('T')[0]}</div>
        {user.Id==commentData[rowIndex].User.id?<div className="delete" onClick={onClickHandler}>X</div>: ''}
      </header>
      <body>
      {commentData[rowIndex].comment}
      </body>
    </div>
  )
}

export default Comment
