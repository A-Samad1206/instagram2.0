import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../redux/actions/postActions';
import { getUser } from '../../redux/actions/userActions';
import firebase from 'firebase';
const Profile = (props) => {
  const { posts } = useSelector((state) => state.posts);
  const { user, isOwner, isFollowing, loading } = useSelector(
    (state) => state.user
  );
  const userId = props.route?.params?.userId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(userId || firebase.auth().currentUser.uid));
    dispatch(getPosts(userId || firebase.auth().currentUser.uid));
  }, [userId]);
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
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>{user?.name}</Text>
        <Text>{user?.email}</Text>
        {!isOwner && !loading && (
          <View>
            <Text>
              {isFollowing ? (
                <Button title="Following" onPress={unFollow} />
              ) : (
                <Button onPress={follow} title="Follow" />
              )}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.galleryContainer}>
        {posts && (
          <FlatList
            numColumns={3}
            horizontal={false}
            data={posts}
            renderItem={({ item }) => (
              <>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{ uri: item.downloadURL }}
                  />
                </View>
              </>
            )}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  galleryContainer: {
    flex: 1,
    border: '2px red solid',
  },
  imageContainer: {
    flex: 1 / 3,
    border: '2px black solid',
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
    height: '100px',
  },
});
export default Profile;
