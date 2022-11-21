import React, { useState } from "react";
import "./OTP.css"
import { Link, useNavigate  } from 'react-router-dom'

const OTPBox = () => {
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
                            onClick={e =>
                                
                                handleClick()
                                
                                
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

export default OTPBox;