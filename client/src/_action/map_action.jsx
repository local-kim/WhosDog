import axios from 'axios';
import { 
    SET_MAP,
    ADD_MARKER,
    REMOVE_MARKER,
    GET_STARS,
    GET_REVIEW_LIST,
    SET_STAR,
    CREATE_REVIEW
} from './types';

export const setMap = (map) => {
  return {
    type: SET_MAP,
    map: map
  }
}

export const addMarker = ( marker, overlay ) => {
  return {
    type: ADD_MARKER,
    marker: marker,
    overlay: overlay
  }
};

export const removeMarker = ( marker ) => {
  return {
    type: REMOVE_MARKER, 
    marker: marker,
  }
};

export const setStar = ( star ) => {
  return {
    type: SET_STAR,
    star:star,
  }
}

export const getStars = (dataToSubmit) => {
  const request = axios.post('/api/map/getStars', { placeId: dataToSubmit })
  .then(response => response.data );

  return {
      type: GET_STARS,
      payload: request
  }
}

export const getReviewList = (dataToSubmit) => {
  const request = axios.post('/api/map/getReviewList', { placeId: dataToSubmit })
  .then(response => response.data );

  return {
      type: GET_REVIEW_LIST,
      payload: request
  }
}

export const createReview = (data) => {
  const request = axios.post('/api/map/createReview', data)
  .then(response => response.data);

  return {
    type: CREATE_REVIEW,
    payload:request
  }
}
export const actionCreators = {
  setMap,
  addMarker,
  removeMarker,
  setStar
};