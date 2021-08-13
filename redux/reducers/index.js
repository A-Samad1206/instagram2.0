import { combineReducers } from 'redux';
import { getUser } from './userReducers';
import { postsReducer } from './postReducers';
const Reducers = combineReducers({
  user: getUser,
  posts: postsReducer,
});
export default Reducers;
