import {
  SET_MAP,
  ADD_MARKER,
  REMOVE_MARKER,
  GET_STARS,
  SET_STAR,
  GET_REVIEW_LIST,
  CREATE_REVIEW,
} from '../_action/types';

const mapReducer = (state = {
  location: {
    latitude: null,
    longitude: null
  },
  myMap: {
    map: null,
    markers: [],
    overlays: [],
  },
  review:{
    star: 0,
  }
}, action) => {
  switch (action.type) {
    case SET_MAP: 
    return {
      ...state,
      myMap: {
        ...state.myMap,
        map: action.map
      }
    };

    case ADD_MARKER:
      return {
        ...state,
        myMap:{
          ...state.myMap,
          markers: action.marker,
          overlays: action.overlay
        }
      };

    case REMOVE_MARKER:
      return {
         ...state,
         myMap:{
           ...state.myMap,
           markers: action.marker
         }
      }
    case SET_STAR:
      return {
        ...state,
        review:{
          star:action.star
        }
      }
  
    case GET_STARS:
    return { ...state, success: action.payload }

    case GET_REVIEW_LIST:
      return { ...state, success:action.payload }
    
    case CREATE_REVIEW:
      return { ...state, success:action.payload}
    default: 
      return state;
  }
}

export default mapReducer;