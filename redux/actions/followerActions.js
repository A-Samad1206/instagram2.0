import firebase from 'firebase';
import {
  FOLLOWERS_GET_SUCCESS,
  FOLLOWERS_GET_REQUEST,
  FOLLOWERS_GET_FAILED,
} from '../constants/followersConst';

export const getFollowers = (userId) => async (dispatch) => {
  try {
    dispatch({ type: FOLLOWERS_GET_REQUEST });
    let followers = await firebase
      .firestore()
      .collection('following')
      .doc(firebase.auth().currentUser.uid)
      .collection('userFollowing')
      .doc(userId)
      .get();

    for (const x in followers) {
      console.log('X x', x);
    }
    followers = followers.docs.map((post) => ({
      id: post.id,
      ...post.data(),
    }));
    dispatch({ type: FOLLOWERS_GET_SUCCESS, followers: followers });
  } catch (err) {
    dispatch({ type: FOLLOWERS_GET_FAILED });
  }
};
