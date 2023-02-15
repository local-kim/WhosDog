import axios from 'axios';
import { 
    SEARCH_IMAGE,
    PRINT_IMAGE
} from './types';


export const searchImage = (dataToSubmit) => {
    const request = axios.post('api/search/', dataToSubmit)
    .then(response => ( response.data));
    
    return {
        type: SEARCH_IMAGE,
        payload: request
    }

}

export const printImage = () => {
  const request = axios.get('api/search/request/')
  .then( response => ( response.data ));

  return {
    type: PRINT_IMAGE,
    payload: request
  }
}