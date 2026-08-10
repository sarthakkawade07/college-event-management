import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhoneAlt,
  FaUniversity,
  FaLaptopCode,
  FaCalendarAlt,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
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

  const handleSubmit = (e) => {
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

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    const userData = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      mobile: formData.mobile.trim(),
      college: formData.college.trim(),
      department: formData.department.trim(),
      year: formData.year,
      password: formData.password,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    setTimeout(() => {
      setLoading(false);

      alert("Registration Successful!");

      navigate("/login");
    }, 1000);
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
            className="active-register"
          >
            Register
          </Link>
        </div>

      </nav>


      {/* ================= MAIN ================= */}

      <div className="register-main">

        {/* ================= LEFT ================= */}

        <section className="register-left">

          <div className="left-content">

            <span className="community-badge">
              🚀 Join the Community
            </span>

            <h1>
              Campus Event Hub
            </h1>

            <h2>
              Create <span>Your Account</span> 👋
            </h2>

            <p className="left-description">
              Join thousands of students and be a part
              of exciting events, workshops, hackathons
              and competitions.
            </p>


            {/* WHY ACCOUNT */}

            <div className="why-box">

              <h3>
                Why Create Account?
              </h3>

              <ul>

                <li>
                  🎯 Register for Events
                </li>

                <li>
                  🎓 Get Digital Certificates
                </li>

                <li>
                  📊 Track Your Registrations
                </li>

                <li>
                  🤝 Join Communities
                </li>

                <li>
                  🔔 Get Event Updates & Reminders
                </li>

              </ul>

            </div>

          </div>


          {/* DECORATION */}

          <div className="bottom-decoration">
            🎓 &nbsp; 👨‍💻 &nbsp; 👩‍💻 &nbsp; 🧑‍💻 &nbsp; 🎓
          </div>

        </section>


        {/* ================= RIGHT ================= */}

        <section className="register-right">

          <form
            className="register-card"
            onSubmit={handleSubmit}
          >

            <div className="register-header">

              <h2>
                Create Your Account
              </h2>

              <p>
                Fill in your details to get started
              </p>

              <div className="header-line"></div>

            </div>


            {/* NAME */}

            <div className="form-group">

              <label>
                Full Name
              </label>

              <div className="input-field">

                <FaUser />

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <div className="input-field">

                <FaEnvelope />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* MOBILE */}

            <div className="form-group">

              <label>
                Mobile Number
              </label>

              <div className="input-field">

                <FaPhoneAlt />

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* COLLEGE */}

            <div className="form-group">

              <label>
                College Name
              </label>

              <div className="input-field">

                <FaUniversity />

                <input
                  type="text"
                  name="college"
                  placeholder="Enter your college name"
                  value={formData.college}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* DEPARTMENT */}

            <div className="form-group">

              <label>
                Department
              </label>

              <div className="input-field">

                <FaLaptopCode />

                <input
                  type="text"
                  name="department"
                  placeholder="Enter your Department"
                  value={formData.department}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* YEAR */}

            <div className="form-group">

              <label>
                Year
              </label>

              <div className="input-field">

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

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <label>
                Password
              </label>

              <div className="input-field">

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

                <span
                  className="password-eye"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </span>

              </div>

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="form-group">

              <label>
                Confirm Password
              </label>

              <div className="input-field">

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

                <span
                  className="password-eye"
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
                </span>

              </div>

            </div>


            {/* BUTTON */}

            <button
              type="submit"
              className="create-account-btn"
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


            <p className="already-account">

              Already have an account?

              <Link to="/login">
                Login
              </Link>

            </p>


            <p className="copyright">
              © 2026 Campus Event Hub
            </p>

          </form>

        </section>

      </div>


      {/* ================= FEATURES ================= */}

      <section className="features-section">

        <div className="feature">

          <div className="feature-icon">
            <FaShieldAlt />
          </div>

          <div>
            <h3>
              Secure & Reliable
            </h3>

            <p>
              Your data is safe with us
            </p>
          </div>

        </div>


        <div className="feature">

          <div className="feature-icon">
            <FaBolt />
          </div>

          <div>
            <h3>
              Quick Registration
            </h3>

            <p>
              Get started in seconds
            </p>
          </div>

        </div>


        <div className="feature">

          <div className="feature-icon">
            <FaStar />
          </div>

          <div>
            <h3>
              Verified Events
            </h3>

            <p>
              Quality events you can trust
            </p>
          </div>

        </div>


        <div className="feature">

          <div className="feature-icon">
            <FaHeadset />
          </div>

          <div>
            <h3>
              24/7 Support
            </h3>

            <p>
              We're here to help you
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Register;