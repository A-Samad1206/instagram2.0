import {
  FOLLOWERS_GET_SUCCESS,
  FOLLOWERS_GET_REQUEST,
  FOLLOWERS_GET_FAILED,
} from '../constants/followersConst';

export const followerReducer = (
  state = { followers: [], loading: false },
  action
) => {
  switch (action.type) {
    case FOLLOWERS_GET_REQUEST:
      return { ...state, loading: true };
    case FOLLOWERS_GET_SUCCESS:
      return { ...state, followers: action.followers, loading: false };
    case FOLLOWERS_GET_FAILED:
      return { ...state, loading: false, error: 'Please Login Again' };
    default:
      return state;
  }
};
