import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, RefreshControl, Dimensions, ScrollView } from 'react-native';
import { api } from '../../api/apiService';
import UserCard from '../../components/UserCard';
import Spinner from 'react-native-loading-spinner-overlay';
import { Block, theme } from 'galio-framework';
const { width, height } = Dimensions.get("screen");

function AllUsers(props) {
    const { navigation } = props
    const imageUri= "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState()
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const getAllUsers= async () => {
        try {

            const res= await api.get(`auth`)
            if (res.status === 200) {
                setData(res.data)
                setLoading(false)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [data, loading])
  return (
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
                ) : data.length === 0 ? (
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontSize:20}}>No Users</Text>
                </View>
                ) : (
                    data.map((item, index) => (
                        <UserCard key={index} 
                        name={item.name}
                        email={item.email}
                        department={item.department}
                        imageUri={imageUri}
                        userId={item._id}
                        navigation={navigation}
                        />
                    ))
                )
            }
        </ScrollView>            
    </Block>
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

export default AllUsers;