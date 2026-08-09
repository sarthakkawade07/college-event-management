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

  // ==============================
  // FORGOT PASSWORD
  // ==============================

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  // ==============================
  // LOGIN
  // ==============================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    if (!password.trim()) {
      alert("Please enter your password.");
      return;
    }

    // ==============================
    // ADMIN LOGIN
    // ==============================

    if (
      email.trim().toLowerCase() === "admin@gmail.com" &&
      password === "admin123"
    ) {
      alert("Welcome Admin!");
      navigate("/admin-dashboard");
      return;
    }

    // ==============================
    // USER LOGIN
    // ==============================

    const savedUser =
      JSON.parse(localStorage.getItem("user")) || null;

    if (!savedUser) {
      alert("No account found! Please Register First.");
      navigate("/register");
      return;
    }

    if (
      email.trim().toLowerCase() !==
        savedUser.email.trim().toLowerCase() ||
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
    }, 800);
  };

  return (
    <div className="login-page">

      {/* =====================================
          LEFT SIDE
      ===================================== */}

      <div className="login-left">

        <div className="login-left-content">

          <span className="login-badge">
            CAMPUS EVENT HUB
          </span>

          <h1>
            Welcome Back 👋
          </h1>

          <p className="login-description">
            Login to discover amazing college events,
            workshops, hackathons and competitions.
          </p>

          {/* WHY JOIN CARD */}

          <div className="login-welcome-box">

            <h3>
              Why Join Campus Event Hub?
            </h3>

            <div className="login-feature">
              <span>🎯</span>
              <p>Register for Events</p>
            </div>

            <div className="login-feature">
              <span>🏆</span>
              <p>Win Digital Certificates</p>
            </div>

            <div className="login-feature">
              <span>📅</span>
              <p>Track Your Registrations</p>
            </div>

            <div className="login-feature">
              <span>👨‍💻</span>
              <p>Participate in Hackathons</p>
            </div>

            <div className="login-feature">
              <span>🎁</span>
              <p>Win Exciting Prizes</p>
            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          RIGHT SIDE
      ===================================== */}

      <div className="login-right">

        <form
          className="login-card"
          onSubmit={handleSubmit}
        >

          <div className="login-card-header">

            <span className="login-card-icon">
              🔐
            </span>

            <h2>
              Sign In
            </h2>

            <p>
              Login to continue to your account
            </p>

          </div>


          {/* =====================================
              EMAIL
          ===================================== */}

          <div className="login-input-box">

            <label>
              Email Address
            </label>

            <div className="login-input-field">

              <FaEnvelope className="login-input-icon" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

          </div>


          {/* =====================================
              PASSWORD
          ===================================== */}

          <div className="login-input-box">

            <label>
              Password
            </label>

            <div className="login-input-field">

              <FaLock className="login-input-icon" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="login-eye-button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>


          {/* =====================================
              OPTIONS
          ===================================== */}

          <div className="login-options">

            <label className="login-remember">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
              />

              <span>
                Remember Me
              </span>

            </label>

            <button
              type="button"
              className="forgot-btn"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>

          </div>


          {/* =====================================
              LOGIN BUTTON
          ===================================== */}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >

            {loading ? (
              "Logging In..."
            ) : (
              <>
                <FaSignInAlt />
                Login
              </>
            )}

          </button>


          {/* =====================================
              DIVIDER
          ===================================== */}

          <div className="login-divider">

            <span></span>

            <p>OR</p>

            <span></span>

          </div>


          {/* =====================================
              GOOGLE
          ===================================== */}

          <button
            type="button"
            className="google-btn"
          >

            <FaGoogle />

            Continue with Google

          </button>


          {/* =====================================
              REGISTER
          ===================================== */}

          <p className="register-text">

            Don't have an account?

            <Link to="/register">
              Register
            </Link>

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