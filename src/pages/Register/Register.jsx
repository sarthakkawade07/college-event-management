import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaPhone,
  FaUniversity,
  FaLaptopCode,
  FaGraduationCap,
  FaUserPlus,
} from "react-icons/fa";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  // ==============================
  // HANDLE INPUT
  // ==============================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==============================
  // REGISTER
  // ==============================

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      fullName,
      email,
      mobile,
      college,
      department,
      year,
      password,
      confirmPassword,
    } = formData;

    if (
      !fullName.trim() ||
      !email.trim() ||
      !mobile.trim() ||
      !college.trim() ||
      !department.trim() ||
      !year ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    if (mobile.length !== 10) {
      alert("Please enter a valid 10 digit mobile number.");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // ==============================
    // CHECK EXISTING USER
    // ==============================

    const existingUser =
      JSON.parse(localStorage.getItem("user")) || null;

    if (
      existingUser &&
      existingUser.email.toLowerCase() ===
        email.trim().toLowerCase()
    ) {
      alert("This email is already registered.");
      navigate("/login");
      return;
    }

    // ==============================
    // SAVE USER
    // ==============================

    const user = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile.trim(),
      college: college.trim(),
      department: department.trim(),
      year,
      password,
    };

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      setLoading(false);

      alert("Registration Successful!");

      navigate("/login");
    }, 800);
  };

  return (
    <div className="register-page">

      {/* =====================================
          LEFT SIDE
      ===================================== */}

      <div className="register-left">

        <div className="register-left-content">

          <span className="register-badge">
            CAMPUS EVENT HUB
          </span>

          <h1>
            Join the
            <br />
            Community 🚀
          </h1>

          <p className="register-description">
            Create your account and start discovering
            amazing college events, workshops,
            hackathons and competitions.
          </p>

          {/* FEATURES */}

          <div className="register-feature-box">

            <h3>
              What You Can Do
            </h3>

            <div className="register-feature">
              <span>🎯</span>
              <p>Register for exciting events</p>
            </div>

            <div className="register-feature">
              <span>📅</span>
              <p>Track all your registrations</p>
            </div>

            <div className="register-feature">
              <span>🏆</span>
              <p>Get digital certificates</p>
            </div>

            <div className="register-feature">
              <span>👨‍💻</span>
              <p>Participate in hackathons</p>
            </div>

            <div className="register-feature">
              <span>🎁</span>
              <p>Win exciting prizes</p>
            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          RIGHT SIDE
      ===================================== */}

      <div className="register-right">

        <form
          className="register-card"
          onSubmit={handleSubmit}
        >

          {/* HEADER */}

          <div className="register-card-header">

            <span className="register-card-icon">
              👤
            </span>

            <h2>
              Create Account
            </h2>

            <p>
              Fill in your details to get started
            </p>

          </div>


          {/* =====================================
              FULL NAME
          ===================================== */}

          <div className="register-input-box">

            <label>
              Full Name
            </label>

            <div className="register-input-field">

              <FaUser className="register-input-icon" />

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* =====================================
              EMAIL
          ===================================== */}

          <div className="register-input-box">

            <label>
              Email Address
            </label>

            <div className="register-input-field">

              <FaEnvelope className="register-input-icon" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* =====================================
              MOBILE
          ===================================== */}

          <div className="register-input-box">

            <label>
              Mobile Number
            </label>

            <div className="register-input-field">

              <FaPhone className="register-input-icon" />

              <input
                type="tel"
                name="mobile"
                placeholder="Enter 10 digit mobile number"
                value={formData.mobile}
                onChange={handleChange}
                maxLength="10"
                required
              />

            </div>

          </div>


          {/* =====================================
              COLLEGE
          ===================================== */}

          <div className="register-input-box">

            <label>
              College Name
            </label>

            <div className="register-input-field">

              <FaUniversity className="register-input-icon" />

              <input
                type="text"
                name="college"
                placeholder="Enter your college name"
                value={formData.college}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* =====================================
              DEPARTMENT
          ===================================== */}

          <div className="register-input-box">

            <label>
              Department
            </label>

            <div className="register-input-field">

              <FaLaptopCode className="register-input-icon" />

              <input
                type="text"
                name="department"
                placeholder="e.g. Computer Engineering"
                value={formData.department}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* =====================================
              YEAR
          ===================================== */}

          <div className="register-input-box">

            <label>
              Academic Year
            </label>

            <div className="register-input-field">

              <FaGraduationCap className="register-input-icon" />

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Year
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


          {/* =====================================
              PASSWORD
          ===================================== */}

          <div className="register-input-box">

            <label>
              Password
            </label>

            <div className="register-input-field">

              <FaLock className="register-input-icon" />

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
                required
              />

              <button
                type="button"
                className="register-eye-button"
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
              CONFIRM PASSWORD
          ===================================== */}

          <div className="register-input-box">

            <label>
              Confirm Password
            </label>

            <div className="register-input-field">

              <FaLock className="register-input-icon" />

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
                required
              />

              <button
                type="button"
                className="register-eye-button"
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

          </div>


          {/* =====================================
              REGISTER BUTTON
          ===================================== */}

          <button
            type="submit"
            className="register-submit-btn"
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


          {/* LOGIN LINK */}

          <p className="register-login-text">

            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </p>


          <p className="register-copyright">
            © 2026 Campus Event Hub
          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;