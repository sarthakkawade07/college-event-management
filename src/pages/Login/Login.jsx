import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaGoogle,
  FaArrowRight,
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

    // Email validation
    if (email.trim() === "") {
      alert("Please enter your email.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    // Password validation
    if (password.trim() === "") {
      alert("Please enter your password.");
      return;
    }

    // ==============================
    // ADMIN LOGIN
    // ==============================

    if (
      email === "admin@gmail.com" &&
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
      JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("No account found! Please Register First.");

      navigate("/register");

      return;
    }

    // ==============================
    // CHECK LOGIN DETAILS
    // ==============================

    if (
      email !== savedUser.email ||
      password !== savedUser.password
    ) {
      alert("Invalid Email or Password");

      return;
    }

    // ==============================
    // LOGIN SUCCESS
    // ==============================

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(savedUser)
      );

      // Remember Me
      if (rememberMe) {
        localStorage.setItem(
          "rememberMe",
          "true"
        );
      } else {
        localStorage.removeItem("rememberMe");
      }

      alert("Login Successful!");

      navigate("/dashboard");
    }, 1000);
  };

  // ==============================
  // UI
  // ==============================

  return (
    <div className="login-page">

      {/* =================================
          LEFT SIDE
      ================================= */}

      <div className="login-left">

        <div className="login-left-content">

          <span className="login-badge">
            CAMPUS EVENT HUB
          </span>

          <h1>
            Welcome Back 👋
          </h1>

          <h2>
            Discover. Participate. Achieve.
          </h2>

          <p>
            Login to explore amazing college events,
            workshops, hackathons and competitions.
            Manage your registrations and track your
            participation in one place.
          </p>

          {/* ============================
              WELCOME BOX
          ============================ */}

          <div className="welcome-box">

            <h3>
              Why Join Campus Event Hub?
            </h3>

            <ul>

              <li>
                <span>🎯</span>
                Register for exciting events
              </li>

              <li>
                <span>🏆</span>
                Earn digital certificates
              </li>

              <li>
                <span>📅</span>
                Track your registrations
              </li>

              <li>
                <span>👨‍💻</span>
                Participate in hackathons
              </li>

              <li>
                <span>🎁</span>
                Win exciting prizes
              </li>

            </ul>

          </div>

        </div>

      </div>


      {/* =================================
          RIGHT SIDE
      ================================= */}

      <div className="login-right">

        <form
          className="login-card"
          onSubmit={handleSubmit}
        >

          {/* ============================
              HEADER
          ============================ */}

          <div className="login-header">

            <div className="login-icon">
              <FaSignInAlt />
            </div>

            <h2>
              Sign In
            </h2>

            <p>
              Login to your Campus Event Hub account
            </p>

          </div>


          {/* ============================
              EMAIL
          ============================ */}

          <div className="input-box">

            <label>
              Email Address
            </label>

            <div className="input-field">

              <FaEnvelope className="input-icon" />

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


          {/* ============================
              PASSWORD
          ============================ */}

          <div className="input-box">

            <label>
              Password
            </label>

            <div className="input-field">

              <FaLock className="input-icon" />

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
                className="eye-icon"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
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


          {/* ============================
              OPTIONS
          ============================ */}

          <div className="login-options">

            <label className="remember">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(
                    e.target.checked
                  )
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


          {/* ============================
              LOGIN BUTTON
          ============================ */}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >

            {loading ? (
              <>
                <span className="loader"></span>
                Logging In...
              </>
            ) : (
              <>
                <FaSignInAlt />
                Login
                <FaArrowRight className="login-arrow" />
              </>
            )}

          </button>


          {/* ============================
              DIVIDER
          ============================ */}

          <div className="divider">

            <span>
              OR
            </span>

          </div>


          {/* ============================
              GOOGLE BUTTON
          ============================ */}

          <button
            type="button"
            className="google-btn"
          >

            <FaGoogle />

            Continue with Google

          </button>


          {/* ============================
              REGISTER
          ============================ */}

          <p className="register-text">

            Don't have an account?

            <Link to="/register">
              Register Now
            </Link>

          </p>


          {/* ============================
              COPYRIGHT
          ============================ */}

          <p className="copyright">
            © 2026 Campus Event Hub
            <br />
            All rights reserved.
          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;