import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  View,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";
import { HeaderHeight } from "../../constants/utils";
import Modal from "react-native-modal";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

export default function Profile() {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <Block flex style={styles.profile}>
      <Modal isVisible={isModalVisible}>
        <Block flex style={styles.modalCard}>
          {/* <Text bold size={28} color="#32325D">Hello!</Text>

          <Button onPress={toggleModal} >
            Close
          </Button> */}
          <Block flex style={{ marginTop: 20 }}>
            <Block flex={0.17} middle>
              <Text color="black" size={30}>
                Change Password
              </Text>
            </Block>
            <Block Block flex center>
              <KeyboardAvoidingView>
                
                <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                  <Text bold size={16} color="#32325D">
                    New Password
                  </Text>
                  <Block width={width * 0.8}>
                  <Input
                      password
                      borderless
                      placeholder="New Password"
                      // value={name}
                      // onChangeText={(text) => setName(text)}
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
                </Block>
                <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                  <Text bold size={16} color="#32325D">
                    Confirm Password
                  </Text>
                  <Block width={width * 0.8}>
                  <Input
                      password
                      borderless
                      placeholder="Confirm Password"
                      // value={name}
                      // onChangeText={(text) => setName(text)}
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
                </Block>
                <Block middle>
                  <Button
                    color="primary"
                    style={styles.createButton}
                    onPress={toggleModal}
                  >
                    <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                      Change Password 
                    </Text>
                  </Button>
                  <Button onPress={toggleModal} >
            Close
          </Button> 
                </Block>

              </KeyboardAvoidingView>
            </Block>
          </Block>
        </Block>
      </Modal>
      <Block flex>
        <ImageBackground
          source={Images.ProfileBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: "25%" }}
          >
            <Block flex style={styles.profileCard}>
              <Block middle style={styles.avatarContainer}>
                <Image source={Images.ProfilePicture} style={styles.avatar} />
              </Block>
              <Block flex>
                <Block middle style={styles.nameInfo}>
                  <Text bold size={28} color="#32325D">
                    Parvan S
                  </Text>
                  <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                    MCA
                  </Text>
                </Block>
                {/* <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block> */}
                <Block middle>
                  <Text
                    size={16}
                    color="#525F7F"
                    style={{ textAlign: "center" }}
                  >
                    parvan@gmail.com
                  </Text>
                  <Button
                    color="transparent"
                    textStyle={{
                      color: "#233DD2",
                      fontWeight: "500",
                      fontSize: 16,
                    }}
                    onPress={toggleModal}
                  >
                    Change Password
                  </Button>
                </Block>
              </Block>
            </Block>
          </ScrollView>
        </ImageBackground>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height / 2,
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  modalCard: {
    width: width * 0.9,
    height: height * 0.5,
    backgroundColor: "#F4F5F7",
    borderRadius: 20,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
  info: {
    paddingHorizontal: 40,
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
});
