import { Block, Text, theme } from "galio-framework";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { Button, DrawerItem as DrawerCustomItem } from "../components";
import Images from "../constants/Images";
import React from "react";
import hbsLogo from "../assets/imgs/hbs-black.png";
function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const screens = ["Home", 
  // "Profile", 
  "Add User", "Elements", "Articles"];
  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      {/* <Block flex={0.06} style={styles.header} > */}
        <TouchableOpacity flex={0.06}  style={styles.header} onPress={() => navigation.navigate("Home")}>
        <Image styles={styles.logo} source={hbsLogo} />
        <Text h5 bold color="black"  style={{ marginLeft: 3, marginTop: 10 }} >
          HBS
        </Text>
        </TouchableOpacity>
      {/* </Block> */}
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          {/* <Block
            flex
            style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}
          >
            <Block
              style={{
                borderColor: "rgba(0,0,0,0.2)",
                width: "100%",
                borderWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text color="#8898AA" style={{ marginTop: 16, marginLeft: 8 }}>
              DOCUMENTATION
            </Text>
          </Block>
          <DrawerCustomItem title="Getting Started" navigation={navigation} /> */}
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    // justifyContent: "center",
    display: "flex",
    flexDirection: "row",

  },
  logo: {
    height: 20,
    width: 20,
  },
});

export default CustomDrawerContent;
