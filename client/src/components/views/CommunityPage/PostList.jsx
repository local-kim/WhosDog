import React, { useContext } from 'react'
import { PostContext } from './CommunityPage';
import PostPreview from './PostPreview';

const PostList = ({currentPage, postsPerPage}) => {
  const { postData } = useContext(PostContext);
    return (
        <div >
          {Array(postData.length-currentPage*postsPerPage>10?10:postData.length-currentPage*postsPerPage).fill()
          .map((tr, i) => <PostPreview rowIndex={(currentPage)*postsPerPage+i} />)} 
        </div>
    )
}

export default PostList;
