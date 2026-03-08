import "./header.css"

export default function Header(){

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const handleLogout = () => {

    // remove login data
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    // reload app -> returns to login
    window.location.reload()

  }

  return(
    <div className="header">

      <div className="container header-inner">

        <div className="logo">
          tru<span>uth</span>
        </div>

        <div className="profile">

          <div>
            <div className="name">{user.name}</div>
            <div className="company">{user.company}</div>
          </div>

          <img
            src="https://i.pravatar.cc/40"
            alt=""
          />

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  )
}