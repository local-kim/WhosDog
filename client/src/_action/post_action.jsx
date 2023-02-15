import axios from 'axios';
import { 
    GET_POST_LIST,
    CREATE_POST,
    POST_VIEW,
    CREATE_COMMENT,
    DELETE_POST,
    DELETE_COMMENT
} from './types';

export const getPostList = (dataToSubmit) => {
    const request = axios.get('api/post/getList', {
        params:{
            keyword:dataToSubmit
        }
    })
    .then(response => ( response.data ));
    
    return {
        type: GET_POST_LIST,
        payload: request
    }
}

export const createPost = (dataToSubmit) => {
    const request = axios.post('api/post/create', dataToSubmit)
    .then(response => response.data );

    return {
        type: CREATE_POST,
        payload: request
    }
}

export const postView = (id) => {
    const request = axios.post(' http://localhost:3000/api/post/postView', id)
    .then(response => response.data);

    return { 
        type: POST_VIEW,
        payload: request,
    }
}

export const createComment = (dataToSubmit) => {
    const request = axios.post('http://localhost:3000/api/post/createComment', dataToSubmit)
    .then(response => response.data);

    return {
        type:CREATE_COMMENT,
        payload:request,
    }
}

export const deletePost = (dataToSubmit) => {
    const request = axios.delete('http://localhost:3000/api/post/deletePost', {
        data:{
            postId:dataToSubmit
        }
    })
    .then(response => response.data);

    return {
        type:DELETE_POST,
        payload:request
    }
}

export const deleteComment = (dataToSubmit) => {
    const request = axios.delete('http://localhost:3000/api/post/deleteComment', {
        data:{
            commentId:dataToSubmit
        }
    })
    .then(response => response.data);

    return {
        type:DELETE_COMMENT,
        payload:request
    }
}