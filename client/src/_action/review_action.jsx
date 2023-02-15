import axios from 'axios';
import { 
    GET_STARS
} from './types';

export const getStars = (dataToSubmit) => {
  const request = axios.get('/api/map/getStars', { placeId: dataToSubmit })
  .then(response => response.data );

  return {
      type: GET_STARS,
      payload: request
  }
}