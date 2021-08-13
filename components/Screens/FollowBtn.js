import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import firebase from 'firebase';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions/userActions';

const FollowBtn = ({ userId }) => {
  const { loading, isFollowing } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(userId));
  }, []);
  const unFollow = async () => {
    await firebase
      .firestore()
      .collection('following')
      .doc(firebase.auth().currentUser.uid)
      .collection('userFollowing')
      .doc(userId)
      .delete();
    dispatch(getUser(userId));
  };
  const follow = async () => {
    await firebase
      .firestore()
      .collection('following')
      .doc(firebase.auth().currentUser.uid)
      .collection('userFollowing')
      .doc(userId)
      .set({ createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    dispatch(getUser(userId));
  };

  return (
    <View>
      <Text>
        {isFollowing ? (
          <Button
            title={loading ? 'Loading...' : 'Following'}
            onPress={unFollow}
          />
        ) : (
          <Button onPress={follow} title={loading ? 'Loading...' : 'Follow'} />
        )}
      </Text>
    </View>
  );
};

export default FollowBtn;
