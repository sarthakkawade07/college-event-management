import "./Registration.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaUniversity,
  FaLaptopCode,
  FaGraduationCap,
  FaArrowRight,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

function Registration() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ==========================================
  // GET LOGGED IN USER
  // ==========================================

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser")) || {};

  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    fullName: loggedInUser.fullName || "",
    email: loggedInUser.email || "",
    mobile: loggedInUser.mobile || "",
    college: loggedInUser.college || "",
    department: loggedInUser.department || "",
    year: loggedInUser.year || "",
  });

  // ==========================================
  // TANSTACK QUERY - GET EVENT
  // ==========================================

  const {
    data: selectedEvent,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["event", id],

    queryFn: async () => {
      const response = await fetch(
        `https://college-event-management-backend-2mzu.onrender.com/api/events/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch event");
      }

      return response.json();
    },

    enabled: !!id,
  });

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // SUBMIT REGISTRATION
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedEvent) {
      alert("Event Not Found");
      return;
    }

    // Save registration data
    localStorage.setItem(
      "registrationData",
      JSON.stringify({
        eventId: selectedEvent._id,
        eventTitle: selectedEvent.title,
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        college: formData.college,
        department: formData.department,
        year: formData.year,
        amount: selectedEvent.fee,
      })
    );

    // Go to payment
    navigate(`/payment/${selectedEvent._id}`);
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <div className="loading">
        Loading Event...
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (isError) {
    return (
      <div className="loading">
        Failed to load event.
      </div>
    );
  }

  // ==========================================
  // EVENT NOT FOUND
  // ==========================================

  if (!selectedEvent) {
    return (
      <div className="loading">
        Event Not Found.
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="registration-page">

      <div className="registration-container">

        {/* =====================================
            LEFT PANEL
        ===================================== */}

        <div className="left-panel">

          <span className="badge">
            EVENT REGISTRATION
          </span>

          <h1>
            Register Your
            <br />
            Event
          </h1>

          <p className="left-description">
            Fill out the registration form and
            secure your seat for this amazing event.
          </p>

          {/* EVENT CARD */}

          <div className="event-card">

            <h2>
              {selectedEvent.title}
            </h2>

            <div className="event-item">

              <FaCalendarAlt />

              <div>
                <strong>Date</strong>
                <span>
                  {selectedEvent.date}
                </span>
              </div>

            </div>

            <div className="event-item">

              <FaMapMarkerAlt />

              <div>
                <strong>Venue</strong>
                <span>
                  {selectedEvent.venue}
                </span>
              </div>

            </div>

            <div className="event-item">

              <FaMoneyBillWave />

              <div>
                <strong>Fee</strong>

                <span>
                  {Number(selectedEvent.fee) === 0
                    ? "Free"
                    : `₹${selectedEvent.fee}`}
                </span>

              </div>

            </div>

            <h3 className="about-title">
              About Event
            </h3>

            <p className="about-text">
              {selectedEvent.description}
            </p>

          </div>

        </div>

        {/* =====================================
            RIGHT PANEL
        ===================================== */}

        <div className="right-panel">

          <div className="form-header">

            <h2>
              Create Registration
            </h2>

            <p>
              Please fill all required information.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            {/* FULL NAME */}

            <div className="input-box">

              <FaUser className="input-icon" />

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

            </div>

            {/* EMAIL */}

            <div className="input-box">

              <FaEnvelope className="input-icon" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            {/* MOBILE */}

            <div className="input-box">

              <FaPhoneAlt className="input-icon" />

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />

            </div>

            {/* COLLEGE */}

            <div className="input-box">

              <FaUniversity className="input-icon" />

              <input
                type="text"
                name="college"
                placeholder="College Name"
                value={formData.college}
                onChange={handleChange}
                required
              />

            </div>

            {/* DEPARTMENT */}

            <div className="input-box">

              <FaLaptopCode className="input-icon" />

              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                required
              />

            </div>

            {/* YEAR */}

            <div className="input-box">

              <FaGraduationCap className="input-icon" />

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

            {/* BUTTON */}

            <button
              type="submit"
              className="register-btn"
            >

              Continue to Payment

              <FaArrowRight />

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Registration;