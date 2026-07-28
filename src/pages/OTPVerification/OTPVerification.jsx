import "./OTPVerification.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OTPVerification() {

    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const verifyOTP = (e) => {

        e.preventDefault();

        if(otp===""){
            alert("Enter OTP");
            return;
        }

        if(otp!=="123456"){
            alert("Invalid OTP");
            return;
        }

        alert("OTP Verified Successfully");

        navigate("/reset-password");

    }

    return(

        <div className="otp-container">

            <div className="otp-card">

                <h1>OTP Verification</h1>

                <p>
                    Enter the 6 digit OTP sent to your Email.
                </p>

                <form onSubmit={verifyOTP}>

                    <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e)=>setOtp(e.target.value)}
                    />

                    <button>
                        Verify OTP
                    </button>

                </form>

            </div>

        </div>

    )

}

export default OTPVerification;