import "./ResetPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    if (newPassword === "" || confirmPassword === "") {
      alert("Please fill all fields.");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Password Changed Successfully!");

    navigate("/login");
  };

  return (
    <div className="reset-container">

      <div className="reset-card">

        <h1>Reset Password</h1>

        <p>Create your new password.</p>

        <form onSubmit={handleReset}>

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">
            Update Password
          </button>

        </form>

      </div>

    </div>
  );
}

export default ResetPassword;