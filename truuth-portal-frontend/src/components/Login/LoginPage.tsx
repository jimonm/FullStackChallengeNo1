import { useState } from "react"
import axios from "axios"
import "./login.css"

export default function LoginPage({ onLogin }: any){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleLogin = async (e:any) => {

    e.preventDefault()

    try{

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      )

      const { token, user } = res.data

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      onLogin()

    }
    catch(err){

      alert("Invalid login credentials")

    }

  }

  return(

    <div className="login-page">

      <div className="login-card">

        <h2 className="logo">
          tru<span>uth</span>
        </h2>

        <h3>Sign in to your account</h3>

        <form onSubmit={handleLogin}>

          <input
            placeholder="Enter your username or email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            className="primary-btn"
            type="submit"
          >
            Sign in
          </button>

        </form>

      </div>

    </div>
  )
}