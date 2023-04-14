import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, Dimensions, ScrollView, RefreshControl } from "react-native";
import { Block, Text, theme } from "galio-framework";
import Card from "../../components/Card";
import articles from "../../constants/articles";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import Spinner from 'react-native-loading-spinner-overlay';
import { api } from "../../api/apiService";
import { AlertNotificationRoot } from "react-native-alert-notification";
const { width } = Dimensions.get("screen");

export default function HBSHome() {
  const {userInfo,userToken}=useContext(AuthContext)
  // const {data,loading}=useFetch(`hall`)
  const [refreshing, setRefreshing] = useState(false);
  const [newp,setNewp] = useState(true);
  const [data,setData]=useState() 
  const [loading,setLoading]=useState(true) 
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getHalls = async () => {
    try {
      const res=await api.get(`hall`)
      if(res.status===200){
        setData(res.data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getHalls()
  }, [data,loading])
  return (
    <AlertNotificationRoot>
    <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          
        }
      >
        {
          loading ? (
          <Spinner
            visible={loading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          ) : data.map((item,index)=>{
            return <Card key={index} item={item} horizontal />
          })
        }
      </ScrollView>
    </Block>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});
