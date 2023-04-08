import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "apisauce";
import { getToken } from "../app/auth/Store";
const userToken= getToken();
console.log("THis-->>>",JSON.parse(userToken._z));
export const api=create({
    baseURL:"http://192.168.56.111:4001/api/",
    headers:{
        "Content-Type":"application/json",
        "token":JSON.parse(userToken._z)
    }
})