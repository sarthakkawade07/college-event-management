import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhoneAlt,
  FaUniversity,
  FaLaptopCode,
  FaGraduationCap,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
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

      {/* LEFT SIDE */}

      <div className="register-left">

        <h1>Campus Event Hub</h1>

        <h2>Create Your Account 🚀</h2>

        <p>
          Join Campus Event Hub and discover amazing
          college events, workshops, hackathons and
          competitions.
        </p>

        <div className="register-welcome-box">

          <h3>Why Create Account?</h3>

          <ul>
            <li>🎯 Register for Events</li>
            <li>🏆 Get Digital Certificates</li>
            <li>📅 Track Your Registrations</li>
            <li>👨‍💻 Join Hackathons</li>
            <li>🎁 Discover Exciting Events</li>
          </ul>

        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="register-right">

        <form
          className="register-card"
          onSubmit={handleSubmit}
        >

          <div className="register-header">

            <h2>Create Account</h2>

            <p>
              Fill in your details to get started.
            </p>

          </div>


          {/* FULL NAME */}

          <div className="register-input-box">

            <label>Full Name</label>

            <div className="register-input-field">

              <FaUser className="register-input-icon" />

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

          <div className="register-input-box">

            <label>Email Address</label>

            <div className="register-input-field">

              <FaEnvelope className="register-input-icon" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

          </div>


          {/* MOBILE */}

          <div className="register-input-box">

            <label>Mobile Number</label>

            <div className="register-input-field">

              <FaPhoneAlt className="register-input-icon" />

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

          <div className="register-input-box">

            <label>College Name</label>

            <div className="register-input-field">

              <FaUniversity className="register-input-icon" />

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

          <div className="register-input-box">

            <label>Department</label>

            <div className="register-input-field">

              <FaLaptopCode className="register-input-icon" />

              <input
                type="text"
                name="department"
                placeholder="Enter your department"
                value={formData.department}
                onChange={handleChange}
              />

            </div>

          </div>


          {/* YEAR */}

          <div className="register-input-box">

            <label>Year</label>

            <div className="register-input-field">

              <FaGraduationCap className="register-input-icon" />

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
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


          {/* PASSWORD */}

          <div className="register-input-box">

            <label>Password</label>

            <div className="register-input-field">

              <FaLock className="register-input-icon" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />

              <span
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
              </span>

            </div>

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="register-input-box">

            <label>Confirm Password</label>

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
              />

              <span
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
              </span>

            </div>

          </div>


          {/* BUTTON */}

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


          <p className="login-text">

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