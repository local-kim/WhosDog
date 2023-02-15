import { combineReducers, createStore } from 'redux';
import userReducer from './user_reducer';
import searchReducer from './search_reducer';
import mapReducer from './map_reducer';
import postReducer from './post_reducer';

const rootReducer = combineReducers({
   map: mapReducer,
   post: postReducer,
})

const store = createStore(rootReducer);

export default rootReducer;