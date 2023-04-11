import { Block, Text } from 'galio-framework';
import React from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet } from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import { Button, Icon, Input } from '../../components';
import { Images, argonTheme } from '../../constants';
const { width, height } = Dimensions.get("screen");

function HallRegister(props) {
    const { navigation } = props;
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
                      <Button color="primary" style={styles.createButton} >
                        {/* <Text bold size={14} color={argonTheme.COLORS.WHITE}> */}
                        Add
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
        height: height * 0.37,
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