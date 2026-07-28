import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
} from "react-icons/fa";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    college: "",
    department: "",
    year: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.fullName.trim() === "") {
      alert("Enter Full Name");
      return;
    }

    if (formData.email.trim() === "") {
      alert("Enter Email");
      return;
    }

    if (!formData.email.includes("@")) {
      alert("Enter Valid Email");
      return;
    }

    if (formData.mobile.length !== 10) {
      alert("Enter Valid Mobile Number");
      return;
    }

    if (formData.college.trim() === "") {
      alert("Enter College Name");
      return;
    }

    if (formData.department.trim() === "") {
      alert("Enter Department");
      return;
    }

    if (formData.year === "") {
      alert("Select Year");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!formData.terms) {
      alert("Accept Terms & Conditions");
      return;
    }

    // Save User
    const user = {
      fullName: formData.fullName,
      email: formData.email,
      mobile: formData.mobile,
      college: formData.college,
      department: formData.department,
      year: formData.year,
      password: formData.password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful!");

    navigate("/login");
  };
    return (
    <div className="register-page">

      <div className="register-left">
        <h1>Campus Event Hub</h1>

        <h2>Create Your Account 🚀</h2>

        <p>
          Join thousands of students and participate in exciting college events,
          hackathons, workshops and competitions.
        </p>
      </div>

      <div className="register-right">
        <form className="register-card" onSubmit={handleSubmit}>

          <h2>Register</h2>

          {/* Full Name */}
          <div className="input-box">
            <label>Full Name</label>

            <div className="input-field">
              <FaUser className="input-icon" />

              <input
                type="text"
                name="fullName"
                placeholder="Enter Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div className="input-box">
            <label>Email</label>

            <div className="input-field">
              <FaEnvelope className="input-icon" />

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Mobile */}
          <div className="input-box">
            <label>Mobile Number</label>

            <div className="input-field">
              <FaPhone className="input-icon" />

              <input
                type="tel"
                name="mobile"
                placeholder="Enter Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* College */}
          <div className="input-box">
            <label>College Name</label>

            <div className="input-field">
              <FaUser className="input-icon" />

              <input
                type="text"
                name="college"
                placeholder="Enter College Name"
                value={formData.college}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Department */}
          <div className="input-box">
            <label>Department</label>

            <div className="input-field">
              <FaUser className="input-icon" />

              <input
                type="text"
                name="department"
                placeholder="Enter Department"
                value={formData.department}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Year */}
          <div className="input-box">
            <label>Year</label>

            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
            >
              <option value="">Select Year</option>
              <option value="First Year">First Year</option>
              <option value="Second Year">Second Year</option>
              <option value="Third Year">Third Year</option>
              <option value="Final Year">Final Year</option>
            </select>
          </div>

          {/* Password */}
          <div className="input-box">
            <label>Password</label>

            <div className="input-field">
              <FaLock className="input-icon" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="input-box">
            <label>Confirm Password</label>

            <div className="input-field">
              <FaLock className="input-icon" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <span
                className="eye-icon"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Terms */}
          <div className="terms-box">
            <label>
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />
              I accept Terms & Conditions
            </label>
          </div>

          <button type="submit" className="register-btn">
            <FaUserPlus /> Register
          </button>

          <p className="login-text">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

        </form>
      </div>

    </div>
  );
}

export default Register;