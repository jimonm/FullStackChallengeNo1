import { useState } from "react"
import axios from "axios"
import "./login.css"

const API = import.meta.env.VITE_API_URL

export default function LoginPage({ onLogin }: any){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)

  const handleLogin = async (e:any) => {

    e.preventDefault()
    setLoading(true)

    try{

      const res = await axios.post(
        `${API}/auth/login`,
        { email, password }
      )

      const { token, user } = res.data

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      onLogin()

    }
    catch(err){

      alert("Invalid login credentials")
      setLoading(false)

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
            className={`login-btn ${loading ? "loading" : ""}`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

        </form>

      </div>

    </div>
  )
}