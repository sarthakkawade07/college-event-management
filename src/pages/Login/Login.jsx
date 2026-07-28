import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaGoogle,
} from "react-icons/fa";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      alert("Please enter your email.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    if (password.trim() === "") {
      alert("Please enter your password.");
      return;
    }
    // Admin Login
if (
  email === "admin@gmail.com" &&
  password === "admin123"
) {
  alert("Welcome Admin!");

  navigate("/admin-dashboard");

  return;
}
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("No account found! Please Register First.");
      navigate("/register");
      return;
    }

    if (
      email !== savedUser.email ||
      password !== savedUser.password
    ) {
      alert("Invalid Email or Password");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(savedUser)
      );

      alert("Login Successful!");

      navigate("/dashboard");
    }, 1000);
  };
    return (
    <div className="login-page">

      {/* Left Section */}

      <div className="login-left">

        <h1>Campus Event Hub</h1>

        <h2>Welcome Back 👋</h2>

        <p>
          Login to discover amazing college events,
          workshops, hackathons and competitions.
        </p>

        <div className="welcome-box">

          <h3>Why Join?</h3>

          <ul>
            <li>🎯 Register for Events</li>
            <li>🏆 Win Digital Certificates</li>
            <li>📅 Track Your Registrations</li>
            <li>👨‍💻 Participate in Hackathons</li>
            <li>🎁 Win Exciting Prizes</li>
          </ul>

        </div>

      </div>

      {/* Right Section */}

      <div className="login-right">

        <form className="login-card" onSubmit={handleSubmit}>

          <h2>Sign In</h2>

          <div className="input-box">

            <label>Email Address</label>

            <div className="input-field">

              <FaEnvelope className="input-icon" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

          </div>

          <div className="input-box">

            <label>Password</label>

            <div className="input-field">

              <FaLock className="input-icon" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

            </div>

          </div>

          <div className="login-options">

            <label className="remember">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />

              Remember Me

            </label>

            <button
              type="button"
              className="forgot-btn"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>

          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              "Logging In..."
            ) : (
              <>
                <FaSignInAlt /> Login
              </>
            )}
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="google-btn"
          >
            <FaGoogle />
            Continue with Google
          </button>

          <p className="register-text">
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>

          <p className="copyright">
            © 2026 Campus Event Hub
          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;