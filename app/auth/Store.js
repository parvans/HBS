import * as SecureStore from 'expo-secure-store'


const key="authToken"

export const storeToken=async(authToken)=>{
    // console.log(authToken);
    try {
        await SecureStore.setItemAsync(key,authToken)
        // console.log(key);
    } catch (error) {
        console.log('error storing the auth token',error);
    }
}


export const getToken=async()=>{
    try {
        // console.log("working");
        return await SecureStore.getItemAsync(key)
    } catch (error) {
        console.log('error storing the auth token',error);
    }
}

export const removeToken=async()=>{
    try {
        return await SecureStore.deleteItemAsync(key)
    } catch (error) {
        console.log('error storing the auth token',error);
    }
}
