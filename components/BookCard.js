import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';

const BookCard = ({dataid,hallName, hallImage, date, reason, user, department, navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('BookingDetails', {hallName, hallImage, date, reason, user, department, dataid})}>     
    <View style={styles.card}>
      <Image source={{uri:hallImage}} style={styles.image} />

      <Text style={styles.label}>Hall Name:</Text>
      <Text style={styles.value}>{hallName}</Text>

      <Text style={styles.label}>Date:</Text>
      <Text style={styles.value}>{date}</Text>

      <Text style={styles.label}>Reason:</Text>
      <Text style={styles.value}>{reason}</Text>

      {user&&<><Text style={styles.label}>User:</Text>
      <Text style={styles.value}>{user}</Text></>}

      {department&&<><Text style={styles.label}>Department:</Text>
      <Text style={styles.value}>{department}</Text></>}
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    marginBottom: 16,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 5,
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BookCard;
