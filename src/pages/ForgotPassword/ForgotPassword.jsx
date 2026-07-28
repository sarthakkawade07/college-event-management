import "./ForgotPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
     e.preventDefault();
       if (email.trim() === "") {
       alert("Please enter your email.");
       return;
        }

       alert("OTP has been sent to your email.");

      navigate("/otp-verification");
     };

  return (
    <div className="forgot-container">

      <div className="forgot-card">

        <h1>Forgot Password</h1>

        <p>
          Enter your registered email address to receive a password reset link.
        </p>

        <form onSubmit={handleReset}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <button type="submit">
            Send Reset Link
          </button>

        </form>

      </div>

    </div>
  );
}

export default ForgotPassword;