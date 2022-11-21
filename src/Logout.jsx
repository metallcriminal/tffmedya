import { Link, useNavigate  } from 'react-router-dom'
import { ReactSession } from 'react-client-session'

export default function Logout () {
    
    localStorage.clear()
    console.log(ReactSession.get("username"))
    alert("Logged out successfully")
    window.location.href = "/";


}