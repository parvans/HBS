import { create } from "apisauce";
export const api=create({
    baseURL:"http://192.168.1.38:4001/api/",
    headers:{
        "Content-Type":"application/json",
    }
})