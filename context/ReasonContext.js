import { createContext } from "react";

export const ReasonContext=createContext()

export const ReasonProvider=({children})=>{
    return (
        <ReasonContext.Provider value={{search:{reason:""}}}>
            {children}
        </ReasonContext.Provider>
    )
}