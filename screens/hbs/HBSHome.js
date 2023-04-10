import React, { useContext } from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Card from "../../components/Card";
import articles from "../../constants/articles";
import { getToken } from "../../app/auth/Store";
import { AuthContext } from "../../context/AuthContext";
const { width } = Dimensions.get("screen");

export default function HBSHome() {
  const {userInfo,userToken}=useContext(AuthContext)
  // console.log('====================================');
  // console.log(userInfo);
  // console.log(userToken);
  // console.log('====================================');
  return (
    <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        {articles.map((item, index) => (
          <Card key={index} item={item} horizontal />
        ))}
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});
