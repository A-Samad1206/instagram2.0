import {
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAILED,
} from '../constants/userConst';

export const getUser = (state = { user: null, loading: false }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false,
        isFollowing: action.isFollowing,
        isOwner: action.isOwner,
      };
    case USER_DETAILS_FAILED:
      return { ...state, loading: false, error: 'Please Login Again' };
    default:
      return state;
  }
};
