import {
  GET_POST_LIST,
  CREATE_POST,
  POST_VIEW,
  CREATE_COMMENT,
  DELETE_POST,
  DELETE_COMMENT
} from '../_action/types';

const postReducer = (state = {
  user:{
    id:null,
  }
}, action) => {
  switch (action.type) {
    case GET_POST_LIST: 
      return { ...state, 
        user:{
          id:action.payload.id
        },
        success: action.payload };
  
    case CREATE_POST:
      return { ...state, success: action.payload };

    case POST_VIEW:
      return { ...state, success:action.payload };

    case CREATE_COMMENT:
      return { ...state, success:action.payload };

    case DELETE_POST:
      return { ...state, success:action.payload };
     
    case DELETE_COMMENT:
      return { ...state, success:action.payload };

    default:
      return state;
  }
}

export default postReducer;