import { useState, useEffect } from "react"
import Dashboard from "./components/Dashboard/Dashboard"
import LoginPage from "./components/Login/LoginPage"

export default function App(){

  const [loggedIn,setLoggedIn] = useState(false)

  useEffect(()=>{

    const token = localStorage.getItem("token")

    if(token){
      setLoggedIn(true)
    }

  },[])

  return loggedIn
    ? <Dashboard/>
    : <LoginPage onLogin={()=>setLoggedIn(true)}/>

}