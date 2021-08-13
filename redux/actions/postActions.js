import firebase from 'firebase';
import {
  POST_GET_SUCCESS,
  POST_GET_REQUEST,
  POST_GET_FAILED,
} from '../constants/postConst';

export const getPosts = (userId) => async (dispatch) => {
  try {
    dispatch({ type: POST_GET_REQUEST });
    let postSnapshots = [];
    postSnapshots = await firebase
      .firestore()
      .collection('posts')
      .doc(userId ? userId : firebase.auth().currentUser.uid)
      .collection('userPosts')
      .orderBy('createdAt', 'asc')
      .get();
    postSnapshots = postSnapshots.docs.map((post) => ({
      id: post.id,
      ...post.data(),
    }));
    dispatch({ type: POST_GET_SUCCESS, posts: postSnapshots });
  } catch (err) {
    dispatch({ type: POST_GET_FAILED });
  }
};
