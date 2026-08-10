import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUniversity,
  FaGraduationCap,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
  FaCalendarAlt,
  FaShieldAlt,
  FaBolt,
  FaStar,
  FaHeadset,
} from "react-icons/fa";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    college: "",
    department: "",
    year: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.mobile ||
      !formData.college ||
      !formData.department ||
      !formData.year ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (!formData.email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    if (formData.mobile.length !== 10) {
      alert("Please enter a valid 10 digit mobile number.");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Save user data
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        college: formData.college,
        department: formData.department,
        year: formData.year,
        password: formData.password,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      setTimeout(() => {
        setLoading(false);

        alert("Account Created Successfully!");

        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log("REGISTER ERROR:", error);

      setLoading(false);

      alert("Something went wrong.");
    }
  };

  return (
    <div className="register-page">

      {/* ================= NAVBAR ================= */}

      <nav className="register-navbar">

        <div className="register-logo">
          <FaCalendarAlt />
          <span>
            Campus <b>Event Hub</b>
          </span>
        </div>

        <div className="register-nav-links">

          <Link to="/">Home</Link>

          <Link to="/events">Events</Link>

          <Link to="/about">About</Link>

          <Link to="/contact">Contact</Link>

          <Link to="/login">Login</Link>

          <Link
            to="/register"
            className="register-nav-active"
          >
            Register
          </Link>

        </div>

      </nav>


      {/* ================= MAIN ================= */}

      <div className="register-main">

        {/* ================= LEFT SIDE ================= */}

        <section className="register-left">

          <div className="register-decoration register-dot-one"></div>
          <div className="register-decoration register-dot-two"></div>
          <div className="register-circle-one"></div>
          <div className="register-circle-two"></div>

          <div className="register-left-content">

            <div className="register-community-badge">
              🚀 Join the Community
            </div>

            <h1>
              Campus Event Hub
            </h1>

            <h2>
              Create <span>Your Account</span> 👋
            </h2>

            <p className="register-description">
              Join thousands of students and be a part
              of exciting events, workshops,
              hackathons and competitions.
            </p>


            {/* WHY CREATE ACCOUNT */}

            <div className="register-benefits">

              <h3>
                Why Create Account?
              </h3>

              <div className="register-benefit">
                <span>🔐</span>
                <p>Register for Events</p>
              </div>

              <div className="register-benefit">
                <span>🎓</span>
                <p>Get Digital Certificates</p>
              </div>

              <div className="register-benefit">
                <span>📊</span>
                <p>Track Your Registrations</p>
              </div>

              <div className="register-benefit">
                <span>🤝</span>
                <p>Join Communities</p>
              </div>

              <div className="register-benefit">
                <span>🔔</span>
                <p>Get Event Updates & Reminders</p>
              </div>

            </div>

          </div>

        </section>


        {/* ================= RIGHT SIDE ================= */}

        <section className="register-right">

          <div className="register-card">

            <div className="register-card-header">

              <h2>
                Create Your Account
              </h2>

              <p>
                Fill in your details to get started
              </p>

              <div className="register-title-line"></div>

            </div>


            <form onSubmit={handleSubmit}>


              {/* FULL NAME */}

              <div className="register-input">

                <FaUser />

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />

              </div>


              {/* EMAIL */}

              <div className="register-input">

                <FaEnvelope />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>


              {/* MOBILE */}

              <div className="register-input">

                <FaPhone />

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength="10"
                />

              </div>


              {/* COLLEGE */}

              <div className="register-input">

                <FaUniversity />

                <input
                  type="text"
                  name="college"
                  placeholder="Enter your college name"
                  value={formData.college}
                  onChange={handleChange}
                />

              </div>


              {/* DEPARTMENT */}

              <div className="register-input">

                <FaGraduationCap />

                <input
                  type="text"
                  name="department"
                  placeholder="Enter your department"
                  value={formData.department}
                  onChange={handleChange}
                />

              </div>


              {/* YEAR */}

              <div className="register-input">

                <FaCalendarAlt />

                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                >

                  <option value="">
                    Select your year
                  </option>

                  <option value="First Year">
                    First Year
                  </option>

                  <option value="Second Year">
                    Second Year
                  </option>

                  <option value="Third Year">
                    Third Year
                  </option>

                  <option value="Final Year">
                    Final Year
                  </option>

                </select>

              </div>


              {/* PASSWORD */}

              <div className="register-input">

                <FaLock />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="register-eye"
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


              {/* CONFIRM PASSWORD */}

              <div className="register-input">

                <FaLock />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="register-eye"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>


              {/* BUTTON */}

              <button
                type="submit"
                className="register-create-btn"
                disabled={loading}
              >

                {loading ? (
                  "Creating Account..."
                ) : (
                  <>
                    <FaUserPlus />
                    Create Account
                  </>
                )}

              </button>

            </form>


            {/* LOGIN */}

            <p className="register-login-text">

              Already have an account?

              <Link to="/login">
                Login
              </Link>

            </p>


            <p className="register-copyright">
              © 2026 Campus Event Hub
            </p>

          </div>

        </section>

      </div>


      {/* ================= FEATURES ================= */}

      <div className="register-features">

        <div className="register-feature">

          <div className="feature-icon">
            <FaShieldAlt />
          </div>

          <div>
            <h4>Secure & Reliable</h4>
            <p>Your data is safe with us</p>
          </div>

        </div>


        <div className="register-feature">

          <div className="feature-icon">
            <FaBolt />
          </div>

          <div>
            <h4>Quick Registration</h4>
            <p>Get started in seconds</p>
          </div>

        </div>


        <div className="register-feature">

          <div className="feature-icon">
            <FaStar />
          </div>

          <div>
            <h4>Verified Events</h4>
            <p>Quality events you can trust</p>
          </div>

        </div>


        <div className="register-feature">

          <div className="feature-icon">
            <FaHeadset />
          </div>

          <div>
            <h4>24/7 Support</h4>
            <p>We're here to help you</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;