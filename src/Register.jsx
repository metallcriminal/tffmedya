import React, { useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import UserContext, { UserConsumer } from "./utils/UserContext";
import validator from 'validator';

export default function Register (){
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


      fetch('http://127.0.0.1:8000/userregister', {
          method: 'POST',
          body: JSON.stringify({
            // Add parameters here
            'Email' : email,
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
              //user = setUser(data);
              if (errorMessage === 'Şifre uygun' && errorMessage_repeat === '' && data === "Added Successfully" ) {

                window.location.href = "/login";
              }
           })
           .catch((err) => {
              console.log(err.message);
           })
  }

    return (
        <div className="auth-form-container">
            <h2>Kayıt Ol</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">İsim</label>
            <input value={name} onChange={(e) => setName(e.target.value)}type="name" placeholder="İsim" id="name" name="name" required/>
            <label htmlFor="surname">Soyisim</label>
            <input value={surname} onChange={(e) => setSurname(e.target.value)}type="surname" placeholder="Soyisim" id="surname" name="surname" required/>
            <label htmlFor="username">Kullanıcı İsmi</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)}type="username" placeholder="Kullanıcı Adı" id="username" name="username"required />
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="Mailinizi giriniz" id="email" name="email"required />
            <label htmlFor="password">Şifre</label>
            <input value={pass} onChange={(e) =>  {setPass(e.target.value); validate(e.target.value) }} type="password" placeholder="********" id="password" name="password"required/> <br/>
            {errorMessage === '' ? null :
            <span style={{
              fontWeight: 'bold',
              color: errorMessage === 'Şifre uygun' ? 'green' : 'red', 
              
            }}>{errorMessage}<br/></span> }
            
            <label htmlFor="password">Şifreyi tekrar giriniz</label>
            <input value={pass_repeat} onChange={(e) => {setPass_repeat(e.target.value); checkEquality(e.target.value) }} type="password" placeholder="********" id="password_repeat" name="password_repeat" required/><br/>
            
            {errorMessage_repeat === '' ? null :
            <span style={{
              fontWeight: 'bold',
              color: 'red', 
              
            }}>{errorMessage_repeat}<br/></span> }
            <button type="submit" >Kayıt</button>
        </form>
        <Link to= "/login"><button className = "link-btn" >Zaten hesabınız var mı? Giriş yapın.</button></Link>
    </div>
    )


}