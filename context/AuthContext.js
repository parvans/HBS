import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext=createContext()
export const AuthProvider=({children})=>{
    const [isLoading, setIsLoading]=useState(false)
    const [userToken, setUserToken]=useState(null)
    const [userInfo, setUserInfo]=useState()
    const login=(data)=>{
        setIsLoading(true)
        setUserInfo(data)
        setUserToken(data.token)
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
        AsyncStorage.setItem('userToken', data.token)
        setIsLoading(false)
    }
    const logout=()=>{
        setIsLoading(true)
        setUserToken(null)
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('userToken')
        setIsLoading(false)
    }

    const isLoggedIn=async()=>{
        try {
            setIsLoading(true)
            let userToken = await AsyncStorage.getItem('userToken')
            let userInfo = await AsyncStorage.getItem('userInfo')
            userInfo = JSON.parse(userInfo)
            if (userInfo) {
                setUserInfo(userInfo)
                setUserToken(userToken)
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        isLoggedIn()
    },[])
    return (
        <AuthContext.Provider value={{login, logout, userToken, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}