import { createContext } from "react";

export const CancelDateContext=createContext()

export const CancelDateProvider=({children})=>{
    return (
        <CancelDateContext.Provider value={{search:{date:""}}}>
            {children}
        </CancelDateContext.Provider>
    )
}