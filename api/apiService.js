import { create } from "apisauce";

export const api=create({
    baseURL:"http://192.168.56.111:4001/api/",
    headers:{
        "Content-Type":"application/json",
    }
})