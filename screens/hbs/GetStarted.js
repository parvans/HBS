import React, { useContext } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import argonTheme from "../../constants/Theme";
import Images from "../../constants/Images";
import hbslogo from "../../assets/imgs/hbs-white.png"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";

export default function GetStarted(props) {
    const{navigation} = props;
    const {userToken}= useContext(AuthContext)
    const handleAuth=()=>{
      if(userToken){
        // console.log(userToken);
        navigation.navigate("Home")
      }else{
        navigation.navigate("Login")
      }
    }
  return (
    <Block flex style={styles.container}>
    <StatusBar hidden />
    <Block flex center>
    <ImageBackground
        source={Images.Onboarding}
        style={{ height, width, zIndex: 1 }}
      />
    </Block>
    <Block center>
      <Image source={hbslogo} style={styles.logo} />
    </Block>
    <Block flex space="between" style={styles.padded}>
        <Block flex space="around" style={{ zIndex: 2 }}>
          <Block style={styles.title}>
            <Block>
              <Text color="white" size={60}>
                Hall
              </Text>
            </Block>
            <Block>
              <Text color="white" size={60}>
                Booking
              </Text>
            </Block>
            <Block>
              <Text color="white" size={60}>
                System
              </Text>
            </Block>
            {/* <Block style={styles.subTitle}>
              <Text color="white" size={16}>
                Fully coded React Native components.
              </Text>
            </Block> */}
          </Block>
          <Block center>
            <Button
              style={styles.button}
              color={argonTheme.COLORS.SECONDARY}
              onPress={handleAuth}
              textStyle={{ color: argonTheme.COLORS.BLACK }}
            >
              Get Started
            </Button>
          </Block>
      </Block>
    </Block>
  </Block>
  )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.COLORS.BLACK
    },
    padded: {
      paddingHorizontal: theme.SIZES.BASE * 2,
      position: "relative",
      bottom: theme.SIZES.BASE,
      zIndex: 2,
    },
    button: {
      width: width - theme.SIZES.BASE * 4,
      height: theme.SIZES.BASE * 3,
      shadowRadius: 0,
      shadowOpacity: 0
    },
    logo: {
      width: 100,
      height: 100,
      zIndex: 2,
      position: 'relative',
      marginTop: '-50%'
    },
    title: {
      marginTop:'-5%'
    },
    subTitle: {
      marginTop: 20
    }
  });
  
  