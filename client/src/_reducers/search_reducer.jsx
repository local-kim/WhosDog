import {
  SEARCH_IMAGE,
  PRINT_IMAGE,
} from '../_action/types';

const searchReducer = (state , action) => {
  switch (action.type) {
    case SEARCH_IMAGE: 
      return { ...state, success: action.payload };
  
    case PRINT_IMAGE:
      return { ...state, success: action.payload };
    default:
      break;
  }
}

export default searchReducer;