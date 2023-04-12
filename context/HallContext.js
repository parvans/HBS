import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const HallContext=createContext()

export const HallProvider=({children})=>{
    const [hallData,setHallData]=useState()
    const hall=(data)=>{
        setHallData(data)
        AsyncStorage.setItem('hallData', JSON.stringify(hallData))
    }

    const isHall=async()=>{
        try {
            let hallData = await AsyncStorage.getItem('hallData')
            hallData = JSON.parse(hallData)
            if (hallData) {
                setHallData(hallData)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        isHall()
    },[])
    return (
        <HallContext.Provider value={{search:{date:""},hallData}}>
            {children}
        </HallContext.Provider>
    )
}