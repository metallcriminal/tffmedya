import React, { useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import UserContext, { UserConsumer } from "./utils/UserContext";
import validator from 'validator';
import {ReactSession} from 'react-client-session'

export default function ChangePassword (){
    const [errorMessage, setErrorMessage] = useState('')
    const [errorMessage_repeat, setErrorMessage_repeat] = useState('')
 
    const validate = (value) => {
 
    if (validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setErrorMessage('Şifre uygun')
    } else {
      setErrorMessage('Şifre uygun değil')
    }
    }

    const checkEquality = (value) => {
 
      if (value === pass) {
        setErrorMessage_repeat('')
        
      } 
       
      else {
        setErrorMessage_repeat('Şifreler eşleşmiyor')
      }
    }

    //const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [pass_repeat, setPass_repeat] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();


      fetch('http://127.0.0.1:8000/userupdate', {
          method: 'POST',
          body: JSON.stringify({
            // Add parameters here
            'Email' : ReactSession.get("email"),
            'Password' : pass,
            'FirstName' : ReactSession.get("firstname"),
            'LastName' : ReactSession.get("lastname"),
            'UserName' : ReactSession.get("username"),
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
           .then((response) => response.json())
           .then((data) => {
              console.log(data);
              // Handle data
              //user = setUser(data);
              if (errorMessage === 'Şifre uygun' && errorMessage_repeat === '' && data === "Updated Successfully" ) {
                localStorage.clear()
               

                window.location.href = "/login";
              }
           })
           .catch((err) => {
              console.log(err.message);
           })
  }

    return (
        <div className="auth-form-container">
            <h2>Şifre Değiştir</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="password">Yeni Şifre</label>
            <input value={pass} onChange={(e) =>  {setPass(e.target.value); validate(e.target.value) }} type="password" placeholder="********" id="password" name="password"required/> <br/>
            {errorMessage === '' ? null :
            <span style={{
              fontWeight: 'bold',
              color: errorMessage === 'Şifre uygun' ? 'green' : 'red', 
              
            }}>{errorMessage}<br/></span> }
            
            <label htmlFor="password">Yeni şifreyi tekrar giriniz</label>
            <input value={pass_repeat} onChange={(e) => {setPass_repeat(e.target.value); checkEquality(e.target.value) }} type="password" placeholder="********" id="password_repeat" name="password_repeat" required/><br/>
            
            {errorMessage_repeat === '' ? null :
            <span style={{
              fontWeight: 'bold',
              color: 'red', 
              
            }}>{errorMessage_repeat}<br/></span> }
            <button type="submit" >Şifreyi Değiştir</button>
        </form>
    </div>
    )


}