import { Block, Text } from 'galio-framework';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Dimensions, ImageBackground, StatusBar, StyleSheet } from 'react-native';
import { ALERT_TYPE, AlertNotificationRoot, Dialog,Toast } from 'react-native-alert-notification';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import { Button, Icon, Input } from '../../components';
import { Images, argonTheme } from '../../constants';
import { api } from '../../api/apiService';
import { AuthContext } from '../../context/AuthContext';
const { width, height } = Dimensions.get("screen");

function HallRegister(props) {
  const {userToken}=useContext(AuthContext)
  const { navigation } = props;
  const [name, setName] = useState('');
  const handleNewHall = async() => {
    if(!name){
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Please enter hall name',
        button: 'close',
      });
    }else if(name.length < 3){
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Hall name must be at least 3 characters',
        button: 'close',
      });
  }else{
    try {
      const res=await api.post('hall', 
      {
        name:name,
        url:Images.Hall
      },{
        headers: {
          "token": userToken
        }})
        console.log(res.data.message);
      if(res.status === 201){
        // Dialog.show({
        //   type: ALERT_TYPE.SUCCESS,
        //   title: 'Success',
        //   textBody: res.data.message,
        //   button: 'OK',
        //   onPressButton: () => {
        //     navigation.navigate('Home')
        //   }
        // });

        Alert.alert(
          "Success",
          res.data.message,
          [
            {
              text: "OK",
              onPress: () => navigation.navigate('Home')
            }
          ],
          { cancelable: false }

        )
      }else{
        // Dialog.show({
        //   type: ALERT_TYPE.DANGER,
        //   title: 'Error',
        //   textBody: res.data.message,
        //   button: 'close',
        // });

        Alert.alert(
          "Error",
          res.data.message,
          [
            {
              text: "Cancel",
            },
            {
              text: "OK",
              onPress: () => navigation.navigate('Home')
            }
          ],
          { cancelable: false }
        )
      }
    } catch (error) {
      console.log(error)
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
                    Create Hall
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="position"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                        <Input
                        borderless
                        placeholder="Hall Name"
                        value={name}
                        onChangeText={(text) => setName(text)}
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
                        </Block>
                    {/* <Block width={width * 0.8} style={{ marginBottom: 15 }}>
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

                    </Block> */}
                    {/* <Block width={width * 0.8}>
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
                    </Block> */}
                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={handleNewHall}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Add
                        </Text>
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
        height: height * 0.325,
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

export default HallRegister;