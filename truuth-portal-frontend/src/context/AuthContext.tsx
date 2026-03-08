import { createContext, useState } from "react"

export const AuthContext=createContext<any>(null)

export const AuthProvider=({children}:any)=>{

 const [token,setToken]=useState(localStorage.getItem("token"))

 const login=(t:string)=>{
  localStorage.setItem("token",t)
  setToken(t)
 }

 const logout=()=>{
  localStorage.removeItem("token")
  setToken(null)
 }

 return(
  <AuthContext.Provider value={{token,login,logout}}>
   {children}
  </AuthContext.Provider>
 )
}
