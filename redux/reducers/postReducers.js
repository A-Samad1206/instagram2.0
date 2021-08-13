import {
  POST_GET_SUCCESS,
  POST_GET_REQUEST,
  POST_GET_FAILED,
} from '../constants/postConst';

export const postsReducer = (state = { posts: [], loading: false }, action) => {
  switch (action.type) {
    case POST_GET_REQUEST:
      return { ...state, loading: true };
    case POST_GET_SUCCESS:
      return { ...state, posts: action.posts, loading: false };
    case POST_GET_FAILED:
      return { ...state, loading: false, error: 'Please Login Again' };
    default:
      return state;
  }
};
