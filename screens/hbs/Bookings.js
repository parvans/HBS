import { Block, theme } from 'galio-framework';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl, Dimensions } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import BookCard from '../../components/BookCard';
import { AuthContext } from '../../context/AuthContext';
import { api } from '../../api/apiService';
import jwtDecode from 'jwt-decode';
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';
import { log } from 'react-native-reanimated';
const { width, height } = Dimensions.get("screen");

function Bookings(props) {
    const {userInfo,userToken}=useContext(AuthContext)
    const decode=jwtDecode(userToken)
    const {navigation}=props
    const [refreshing, setRefreshing] = useState(false);
    const [loading,setLoading]=useState(true)
    const [data,setData]=useState()
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    const getUserBookings=async()=>{
        try {
            const res=await api.get(`book/userBooking/${decode.id}`)
            //console.log(res.data);
            if(res.status===200){
                setData(res.data)
                setLoading(false)
            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getUserBookings()
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
                ) : data.length===0 ? (
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{fontSize:20}}>No Bookings</Text>
                    </View>
                )
                : data.map((item,index)=>{
                    let dt=new Date(item.date)
                    return <BookCard
                    key={index}
                    hallName={item.hallId.name}
                    hallImage={item.hallId.url}
                    date={dt.toLocaleDateString()}
                    reason={item.reason}
                    user={item.userId.name}
                    department={item.userId.department}
                    dataid={item._id}
                    navigation={navigation}
                  />
                  
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

export default Bookings;