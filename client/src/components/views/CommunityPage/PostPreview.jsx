import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PostContext } from './CommunityPage';

const PostPreview = ({ rowIndex }) => {
  const { postData } = useContext(PostContext);
  const [show, setShow] = useState(false);
  const onClickHandler = () => {
    setShow(true);
    console.log(postData[rowIndex]);
  }
  console.log(rowIndex);
  return (
      <div className="post w-100" onClick={onClickHandler}>
        <Link to={`/postView/${postData[rowIndex].id}`}>
          <header>
            <div className="title">{postData[rowIndex].title}</div>
            <div style={{"color":"black"}}>{postData[rowIndex].User.nick}</div>
          </header>
          <div className="content">{postData[rowIndex].content.length>50?postData[rowIndex].content.substr(0,50) + '...':postData[rowIndex].content}</div>
        </Link>
      </div>
  )
}

export default PostPreview;
