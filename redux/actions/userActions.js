import firebase from 'firebase';
import {
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAILED,
} from '../constants/userConst';
export const getUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const user = await firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .get();

    const isOwner = firebase.auth().currentUser.uid === userId ? true : false;
    let followers = await firebase
      .firestore()
      .collection('following')
      .doc(firebase.auth().currentUser.uid)
      .collection('userFollowing')
      .doc(userId)
      .get();

    const isFollowing = followers.data();
    dispatch({
      type: USER_DETAILS_SUCCESS,
      user: user.data(),
      isOwner,
      isFollowing,
    });
  } catch (err) {
    console.log('From User details action', err);
    dispatch({ type: USER_DETAILS_FAILED });
  }
};
