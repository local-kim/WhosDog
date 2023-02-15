import React, { createContext, useState, useMemo, useEffect } from 'react'
import NavBarLogin from '../NavBar/NavBarLogin';
import PostList from './PostList';
import { getPostList } from '../../../_action/post_action';
import { useDispatch } from 'react-redux';
import Header from '../NavBar/Header';
import Pagination from '../Pagination';


export const PostContext = createContext({
    postData: [],
  })

const CommunityPage = ({ history }) => {
    const [postData, setPostData] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage, setPostPerPage] = useState(10);
    const [totalPosts, setTotalPosts] = useState(0);
    
    const dispatch = useDispatch();

    const getList= () => {
        dispatch(getPostList('')).
        then( response => {
            if(response.payload.success){
                setPostData(response.payload.result);
                setTotalPosts(response.payload.result.length);
            } else {
                alert('로그인이 필요합니다.');
                history.push('/login');
                window.location.reload();
            }
        })
    }

    const onSubmitHandler = () => {
        setPostData([]);
        dispatch(getPostList(search))
        .then(response => {
            if(response.payload.success){
                console.log(response.payload.result);
                setPostData(response.payload.result);
                console.log(postData);
                setTotalPosts(response.payload.result.length);
            } else {
                alert('로그인이 필요합니다.');
                history.push('/login');
                window.location.reload();
            }
        })
    }

    const onSearchHandler = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    useEffect(() => {
        getList();
        console.log(postData);
    }, [])

    const value = useMemo(() => ({ postData }), [postData]);
    return (
        <>
        <Header/>
        <NavBarLogin/>
        <div className="container-custom">
        <div className="card-custom">
            <div className="commuNav"> 
                <button onClick={()=>history.push('/CreatePost')} className="back">+</button>
                <input type="text" onChange={onSearchHandler}/>
                <button className="communityBtn" onClick={onSubmitHandler}>검색</button>
            </div>
            <div> 
            <PostContext.Provider value={value}>
                <PostList currentPage={currentPage} totalPosts={totalPosts} postsPerPage={postsPerPage}/>
            <Pagination currentPage={currentPage} postsPerPage={postsPerPage} totalPosts={totalPosts} paginate={setCurrentPage}/>
            </PostContext.Provider>
            </div>
            </div>
        </div>
        </>
    )
}

export default CommunityPage
