import { Link, useMatch, useResolvedPath } from "react-router-dom";
import {ReactSession} from 'react-client-session'

export default function Navbar(){
   
    return(
        
    <nav className="nav">
        
        <ul> 
            <CustomLink to="/login">Login</CustomLink>
            <CustomLink to="/register">Register</CustomLink>
            <CustomLink to="/profile">Profile</CustomLink>
            <CustomLink to="/poll">Polls</CustomLink>
            <CustomLink to="/logout">Logout</CustomLink>
            
        
        </ul>
    </nav>
    )
} 

function CustomLink({to,children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true   })
   
    return(
        <li className={isActive ? "active" : ""}>   
        <Link to={to} {...props}>{children}</Link> 
        </li> 
    )
}