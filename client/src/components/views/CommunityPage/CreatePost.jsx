import React , {useState} from 'react';
import { createPost} from '../../../_action/post_action';
import { useDispatch } from 'react-redux';
import NavBarLogin from '../NavBar/NavBarLogin';
import Header from '../NavBar/Header';

const CreatePost = ({history}) => {
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const dispatch = useDispatch();

  const onTitleHandler = (event) =>{
    setTitle(event.currentTarget.value);
  }

  const onContentHandler = (event) =>{
    event.preventDefault();
    setContent(event.currentTarget.value);
  }
   
  const onSubmitHandler = (props) => {
    if(title === ''){
        alert('제목을 입력하세요');
    }else if(content === ''){
        alert('내용을 입력하세요');
    } else {
        let postbody = {
            title: title,
            content: content,
        };
        dispatch(createPost(postbody)).
        then( response => {
            console.log('fin');
            history.push('/Community');
        })
    }
  }
  
  return (
    <>
    <Header/>
    <NavBarLogin/>
    <div className="container-custom">
    <div className="card-custom">
      <h2>새 글 쓰기</h2>
      <input value={title} type="text" onChange={onTitleHandler} className="postTitle w-100 mb-1" placeholder="제목을 입력하세요"/>
      <textarea value={content} onChange={onContentHandler} className="postEditor w-100" placeholder="내용을 입력하세요"/>          
      <button className="communityBtn mr-1" onClick={() => history.push('/Community')}>취소</button>
      <button className="communityBtn ml-1" onClick={onSubmitHandler}>글쓰기</button>
    </div>
    </div>
    </>
  )
}

export default CreatePost;
