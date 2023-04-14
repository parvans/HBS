import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';
import { api } from '../../api/apiService';
import { AuthContext } from '../../context/AuthContext';
import jwtDecode from 'jwt-decode';
import { log } from 'react-native-reanimated';
const BookingDetails = (prop) => {
  const { hallImage, hallName, date, reason, user, department, dataid } = prop.route.params;
  const { navigation } = prop;
  const handleDelete=()=>{
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      title: "Delete Booking",
      textBody: "Are you sure you want to delete this booking?",
      button: "Delete",
      onPressButton: () => {
        deleteBooking()
      }
    });
    const deleteBooking=async()=>{
      try {
        const res=await api.delete(`book/${dataid}`)
        if(res.status===200){
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: res.data.message,
            button: "Ok",
          });
        }else{
          Dialog.show({
            type: ALERT_TYPE.ERROR,
            title: "Error",
            textBody: res.data.message,
            button: "close",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

  }

  return (
    <AlertNotificationRoot>
    <View style={styles.container}>
      <Image source={{ uri: hallImage }} style={styles.hallImage} />
      <Text style={styles.hallName}>{hallName}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.reason}>{reason}</Text>
      <Text style={styles.userName}>{user}</Text>
      <Text style={styles.department}>{department}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Cancel Booking</Text>
      </TouchableOpacity>
    </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  hallImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  hallName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  date: {
    fontSize: 18,
    marginTop: 8,
  },
  reason: {
    fontSize: 18,
    marginTop: 8,
  },
  userName: {
    fontSize: 18,
    marginTop: 8,
  },
  department: {
    fontSize: 18,
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default BookingDetails;
