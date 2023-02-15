import {
  GET_STARS
} from '../_action/types';

const reviewReducer = (state , action) => {
  switch (action.type) {
    case GET_STARS:
      return { ...state, success: action.payload }

    default:
      break;
  }
}

export default reviewReducer;