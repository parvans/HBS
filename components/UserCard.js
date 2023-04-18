import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const UserCard = ({ userId,imageUri, name, department,email,navigation }) => {
  
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('User', {name, department,email,imageUri,userId})}>
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.userInfoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.department}>{department}</Text>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  userInfoContainer: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  department: {
    fontSize: 14,
    color: '#999',
  },
    email: {
    fontSize: 14,
    color: '#999',
    },
});

export default UserCard;
