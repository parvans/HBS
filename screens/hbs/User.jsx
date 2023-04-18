import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { api } from "../../api/apiService";
import { AuthContext } from "../../context/AuthContext";
import {ALERT_TYPE,AlertNotificationRoot,Dialog,} from "react-native-alert-notification";

const User = (prop) => {
  const { userToken } = useContext(AuthContext);
  const { navigation } = prop;
  const { userId, name, department, email, imageUri } = prop.route.params;
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  //   const department = 'Engineering'; // This is the disabled department field

  const handleUpdateProfile = async () => {
    try {
      const res = await api.put(
        `auth/updateuser/${userId}`,
        {
          name: userName,
          email: userEmail,
        },
        {
          headers: {
            token: userToken,
          },
        }
      );
      if (res.status === 200) {
        // console.log(res.data.message);
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: res.data.message,
          button: "close",
        });
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: res.data.message,
          button: "close",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProfile = async() => {
    Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Are you sure?",
        textBody: "You want to delete this user?",
        button: "No",
        button: "Yes",
        onPressButton: () => {
          deleteUser();
        },
      });

      const deleteUser = async () => {
        try {
            const res = await api.delete(`auth/deleteUser/${userId}`);
            console.log(res);
            if (res.status === 200) {
            console.log(res.data.message);
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Success",
                textBody: res.data.message,
                button: "Ok",
            });
            } else {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: "Error",
                textBody: res.data.message,
                button: "close",
            });
            }
        } catch (error) {
        console.log(error);
        }
    
      }
  };

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <Image source={{ uri: imageUri }} style={styles.profileImage} />
        <TextInput
          value={userName}
          onChangeText={(text) => setUserName(text)}
          style={styles.textInput}
          placeholder="Name"
        />
        <TextInput
          value={userEmail}
          onChangeText={(text) => setUserEmail(text)}
          style={styles.textInput}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          value={department}
          editable={false}
          style={[styles.textInput, styles.disabledTextInput]}
        />
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateProfile}
        >
          <Text style={styles.buttonText}>Update User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteProfile}
        >
          <Text style={styles.buttonText}>Delete User</Text>
        </TouchableOpacity>
      </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    marginBottom: 32,
  },
  textInput: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  disabledTextInput: {
    color: "#999",
  },
  updateButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    padding: 16,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default User;
