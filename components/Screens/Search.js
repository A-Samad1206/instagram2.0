import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
// import {useDispatch,useSelector} from "react-redux"

const Search = ({ navigation }) => {
  const [fetchUsers, setFetchUsers] = useState([]);
  const getUsers = async (search) => {
    let users = await firebase
      .firestore()
      .collection('users')
      .where('name', '>=', search)
      .get();
    if (users.docs.length) {
      users = users.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setFetchUsers(users);
    } else {
      setFetchUsers([]);
    }
  };

  return (
    <View>
      <TextInput
        style={{ padding: '20px', width: '60%' }}
        placeholder="Search..."
        onChangeText={(e) => getUsers(e)}
      />
      <FlatList
        data={fetchUsers}
        horizontal={false}
        numColumns={1}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', { userId: item.id })}
          >
            <Text
              style={{
                padding: 20,
                border: '0.5px solid #eee',
                backgroundColor: 'crimson',
                color: 'white',
                marginBottom: 5,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Search;
