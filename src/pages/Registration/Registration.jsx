import "./Registration.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

  const [selectedEvent, setSelectedEvent] = useState(null);

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser")) || {};

  const [formData, setFormData] = useState({
    fullName: loggedInUser.fullName || "",
    email: loggedInUser.email || "",
    mobile: loggedInUser.mobile || "",
    college: loggedInUser.college || "",
    department: loggedInUser.department || "",
    year: loggedInUser.year || "",
  });

  // ==============================
  // GET EVENT
  // ==============================

  useEffect(() => {
    fetch(
      `https://college-event-management-backend-2mzu.onrender.com/api/events/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("EVENT:", data);
        setSelectedEvent(data);
      })
      .catch((err) => {
        console.log("EVENT ERROR:", err);
      });
  }, [id]);

  // ==============================
  // INPUT CHANGE
  // ==============================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==============================
  // SUBMIT
  // ==============================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedEvent) {
      alert("Event Not Found");
      return;
    }

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

    navigate(`/payment/${selectedEvent._id}`);
  };

  // ==============================
  // LOADING
  // ==============================

  if (!selectedEvent) {
    return (
      <div className="registration-loading">
        Loading Event...
      </div>
    );
  }

  return (
    <div className="registration-page">

      <div className="registration-container">

        {/* =====================================
            LEFT SIDE
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
            Fill out the registration form and secure
            your seat for this amazing event.
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
                <span>{selectedEvent.date}</span>
              </div>
            </div>

            <div className="event-item">
              <FaMapMarkerAlt />
              <div>
                <strong>Venue</strong>
                <span>{selectedEvent.venue}</span>
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
            RIGHT SIDE
        ===================================== */}

        <div className="right-panel">

          <div className="form-header">

            <h2>Create Registration</h2>

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