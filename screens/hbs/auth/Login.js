import React, { useContext, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { AlertNotificationRoot, ALERT_TYPE, Toast, Dialog } from "react-native-alert-notification";
import { Block, Text } from "galio-framework";
import { Button, Icon, Input } from "../../../components";
import { argonTheme } from "../../../constants";
import Images from "../../../constants/Images";
import { api } from "../../../api/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../../context/AuthContext";
const { width, height } = Dimensions.get("screen");

export default function Login(props) {
  const {login,userToken}=useContext(AuthContext)
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    if (!email && !password) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Email and Password is required',
        button: 'close',
      });
    } else if (!email) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Email is required',
        button: 'close',
      });
    } else if (!password) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Password is required',
        button: 'close',
      });
    } else {
      if (email && password) {
        await api.post('auth/login', {
          email: email,
          password: password
        }).then((response) => {
          console.log(response.status)
          if (response.status === 200) {
            login(response)
            // console.log('====================================');
            //  console.log(userToken);
            // console.log('====================================');
            if (userToken) {
              navigation.navigate('App')
            }
          } else {
            console.log(response.data.message);
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Error',
              textBody: response.data.message,
              button: 'close',
            });
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }


  return (
    <AlertNotificationRoot>
    <Block flex middle >
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block safe flex middle >
            <Block style={styles.registerContainer}>
              <Block flex style={{ marginTop: 20 }}>
                <Block flex={0.17} middle>
                  <Text color="black" size={30}>
                    Login
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="position"
                    enabled
                  >
                    {/* <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                        <Input
                        borderless
                        placeholder="Name"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                        </Block> */}
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />

                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={handleLogin}>
                        {/* <Text bold size={14} color={argonTheme.COLORS.WHITE}> */}
                        Login
                        {/* </Text> */}
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
    </Block>
      </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.375,
    backgroundColor: "#F4F5F7",
    borderRadius: 20,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA",
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
});
