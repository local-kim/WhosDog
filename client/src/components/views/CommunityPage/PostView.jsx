import React, {useState, useMemo, useEffect, createContext} from 'react';
import NavBarLogin from '../NavBar/NavBarLogin';
import { useHistory } from 'react-router-dom';
import Header from '../NavBar/Header';
import { useDispatch, useSelector } from 'react-redux';
import {postView, createComment, deletePost} from '../../../_action/post_action';
import CommentList from './CommentList';

export const CommentContext = createContext({
  commentData: [],
  user: '',
})

const PostView = ({ location, match }) => {
  const history = useHistory();
  const [post, setPost] = useState({}) 
  const [date, setDate] = useState('');
  const [nick, setNick] = useState('');
  const [id, setId] = useState('');
  const [writer, setWriter] = useState('');
  const [comment, setComment] = useState('');
  const [commentData, setCommentData] = useState([]);
  const user = useSelector( state => ({
    Id : state.post.user.id
}));
  const { no } = match.params;
  const dispatch = useDispatch();

  const onCommentHandler = (e) => {
    e.preventDefault();
    setComment(e.currentTarget.value);
  }

  const onSubmitHandler = () => {
    let body = {
      comment:comment,
      posting:id,
    };
    window.location.reload();
    dispatch(createComment(body))
    .then(() => {
    })
  }

  const onClickHandler = () => {
    history.push('/Community');
  }
  
  const onDeleteHandler = () => { 
    history.push('/Community');
    dispatch(deletePost(id));
  }

  useEffect(() => {
    dispatch(postView({id:no}))
    .then(response => {
      if(response.payload.success){
        setCommentData(response.payload.comments);
        setPost(response.payload.post);
        setDate(response.payload.post.createdAt.split('T')[0]);
        setNick(response.payload.post.User.nick);
        setId(response.payload.post.id);
        setWriter(response.payload.post.writer);
      }else {
        alert('게시물이 없습니다.')
        history.goBack();
      }
    })
  },[])

  const value = useMemo(() => ({ commentData }), [commentData]);
  
  return (
    <>
      <Header/>
      <NavBarLogin/>
      <div className="container-custom">
        <div className="card-custom">
          <div style={{"text-align":"left"}}>
          <button className="back" onClick={onClickHandler}>&lt;</button>
          {(user.Id==writer)?
          <>
            <button className="back ml-1" onClick={onDeleteHandler}><img src="/Images/Icons/icon_delete.png" style={{width:"25px", height:"25px"}}/></button>
          </>
          :null}
          </div>
          <div className="card-post">
          <div className="title">{post.title}</div>
          <div><div className="date"><span className="nickname">{nick}</span>&nbsp;&nbsp;{date}</div></div> 
          <div className="content">{post.content}</div>
          </div>
          <form className="comment-card w-100" onSubmit={onSubmitHandler}>
            <div className="input col-10 pl-5"><input type="text" placeholder="댓글을 입력하세요" onChange={onCommentHandler}/></div>
            <div className="input col-2 pr-2"><button type="submit" className="communityBtn">등록</button></div>
          </form>
          <div className="comment-card">
          <CommentContext.Provider value={value}>
            <CommentList/>
          </CommentContext.Provider>
          </div>
        </div>
      </div>
    </>

  )
}

export default PostView
