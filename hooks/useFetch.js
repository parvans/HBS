import { useEffect, useState } from "react"
import { api } from "../api/apiService"
import { log } from "react-native-reanimated"

const useFetch=(url)=>{
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(false)

    useEffect(()=>{
        let fetchData=async ()=>{
            setLoading(true)
            try {
                let res=await api.get(url)  
                setData(res.data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        fetchData()
    },[url])

    return {data,loading ,error}
}

export default useFetch;