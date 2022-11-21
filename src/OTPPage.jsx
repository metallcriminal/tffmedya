import React, { useState } from 'react'
import { Link, useNavigate ,useLocation  } from 'react-router-dom'
import "./OTPBox/OTP.css"

//import { UserProvider } from './utils/UserContext'



//import { UserContext } from './utils/UserContext'
//import { loginUser, setAxiosAuthToken, setToken, getCurrentUser, unsetCurrentUser } from './services/auth';

export default function OTPPage()  {
    const [errorMessage, setErrorMessage] = useState('')
    const code = useLocation().state;
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const Navigate = useNavigate()

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    
    const handleClick = () => {
      if (otp.join("") === code)
      {
         Navigate("/changepassword")
      }
      else
      {
        setErrorMessage("Girdiğiniz kod geçersiz")
      }
        
    }
    
    return (
        <>
            

            

            <div className="row">
                <div className="col text-center">
                    <h2>Kodu Doğrulayın</h2>
                    <p>Mailinize gönderilen kodu doğrulayarak siz olduğunuzu kanıtlayın</p>

                    {otp.map((data, index) => {
                        return (
                            <input
                                className="otp-field"
                                type="text"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onFocus={e => e.target.select()}
                            />
                        );
                    })}

                     {/* <p>OTP Entered - {otp.join("")}</p>
                     {alert("Entered OTP is " + otp.join(""));*/}
                     <br />
                     <br />
                     
                     
                     {errorMessage === '' ? null :
                    <span style={{
                      fontWeight: 'bold',
                      color: 'red', 
                      
                    }}>{errorMessage}<br/>  <br /></span> }

                    
                   

                    <p>
                        <button
                            className="btn btn-secondary mr-2"
                            style={{marginRight: "10px"}}
                            onClick={e => setOtp([...otp.map(v => "")])}
                        >
                            Temizle
                        </button>
                        <button
                            className="btn btn-primary"
                            style={{marginLeft: "10px"}}
                            onClick={e =>{handleClick() }
                                
                                
                                
                                
                            }
                        >
                            Kodu Doğrula
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
};


 
   