import React, { useState } from "react";
import {Link, useLocation} from "react-router-dom";
//import { ReactSession } from "redux-react-session"
import UserContext from "./utils/UserContext";
import { useContext } from "react";
import Login from "./Login";
import Register from "./Register";
import { ReactSession } from 'react-client-session'

export default function Profile (){

    
    //const user_data = useLocation().state;
    const [Message, setMessage] = useState('');
    //console.log(user_data);
    /*
    const [pass, setPass] = useState(user_data.Password);
    const [name, setName] = useState(user_data.FirstName);
    const [surname, setSurname] = useState(user_data.LastName);
    const [username, setUsername] = useState(user_data.UserName);*/
    const [pass, setPass] = useState(ReactSession.get("password"));
    const [name, setName] = useState(ReactSession.get("firstname"));
    const [surname, setSurname] = useState(ReactSession.get("lastname"));
    const [username, setUsername] = useState(ReactSession.get("username"));
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        console.log(surname);
        console.log(username);
        console.log(pass);

        //window.location.href = "/login";

    }


    const handleDeletion = (e) => {
        e.preventDefault();


        fetch('http://127.0.0.1:8000/userdelete', {
            method: 'POST',
            body: JSON.stringify({
                // Add parameters here
                'Email' : ReactSession.get("email"),

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    // Handle data

                    if (data === "Deleted Successfully") {
                        localStorage.clear();
                        window.location.href = "/";
                    }

                })

                .catch((err) => {
                console.log(err.message);
                })

        //window.location.href = "/login";

    }


    const handleUpdate = (e) => {
        e.preventDefault();


        fetch('http://127.0.0.1:8000/userupdate', {
            method: 'POST',
            body: JSON.stringify({
                // Add parameters here
                'Email' : ReactSession.get("email"),
                'Password' : pass,
                'FirstName' : name,
                'LastName' : surname,
                'UserName' : username
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    // Handle data
                    if (data === "Updated Successfully") {
                        ReactSession.set("username", username);
                        ReactSession.set("password", pass);
                        ReactSession.set("firstname", name);
                        ReactSession.set("lastname", surname);
                        setMessage("Profil güncellendi.");
                    }
                })

                .catch((err) => {
                console.log(err.message);
                })

        //window.location.href = "/login";

    }

    return (

        ReactSession.get("username") === undefined ? <h>PLEASE LOGIN FIRST</h> :

        <div className="auth-form-container">
            <h2>Profiliniz</h2>
        <form className="register-form" onSubmit={handleUpdate}>
            <label htmlFor="name">İsim</label>
            <input value={name} onChange={(e) => setName(e.target.value)}type="name"  id="name" name="name" required />
            <label htmlFor="surname">Soyisim</label>
            <input value={surname} onChange={(e) => setSurname(e.target.value)}type="surname"  id="surname" name="surname" required/>
            <label htmlFor="username">Kullanıcı İsmi</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)}type="username"  id="username" name="username" required/>
            <label htmlFor="password">Şifre</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password"  id="password" name="password"required />
            <button style={{marginBottom : '5px'}} type="submit" >Düzenle</button>
            {Message === '' ? null :
                <span style={{
                    fontWeight: 'bold',
                    color: 'green',

                }}>{Message}<br/></span> }

        </form>
        <p></p>
            <button style={{marginTop : '5px'}} type="submit" onClick={handleDeletion} >Profilimi sil</button>


    </div>

    )
}

