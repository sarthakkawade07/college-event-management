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

  useEffect(() => {
    fetch(
      `https://college-event-management-backend-2mzu.onrender.com/api/events/${id}`
    )
      .then((res) => res.json())
      .then((data) => setSelectedEvent(data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  if (!selectedEvent) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="registration-page">

      <div className="registration-container">

        {/* LEFT SIDE */}

        <div className="left-panel">

          <span className="badge">
            EVENT REGISTRATION
          </span>

          <h1>Register Your Event</h1>

          <p>
            Fill out the registration form and secure
            your seat for this amazing event.
          </p>
<div className="event-card">

  <h2>{selectedEvent.title}</h2>

  <div className="event-item">
    <FaCalendarAlt />
    <span>
      <strong>Date :</strong> {selectedEvent.date}
    </span>
  </div>

  <div className="event-item">
    <FaMapMarkerAlt />
    <span>
      <strong>Venue :</strong> {selectedEvent.venue}
    </span>
  </div>

  <div className="event-item">
    <FaMoneyBillWave />
    <span>
      <strong>Fee :</strong>{" "}
      {selectedEvent.fee === 0
        ? "Free Entry"
        : `₹${selectedEvent.fee}`}
    </span>
  </div>

  <h3 className="about-title">
    About Event
  </h3>

  <p className="about-text">
    {selectedEvent.description}
  </p>

</div>

        </div>

        {/* RIGHT SIDE */}

        <div className="right-panel">

          <div className="form-header">

            <h2>Create Registration</h2>

            <p>
              Please fill all required information.
            </p>

          </div>

          <form onSubmit={handleSubmit}>
                        <div className="input-box">
              <FaUser />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <FaEnvelope />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <FaPhoneAlt />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <FaUniversity />
              <input
                type="text"
                name="college"
                placeholder="College Name"
                value={formData.college}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <FaLaptopCode />
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <FaGraduationCap />

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              >
                <option value="">Select Year</option>
                <option value="First Year">First Year</option>
                <option value="Second Year">Second Year</option>
                <option value="Third Year">Third Year</option>
                <option value="Final Year">Final Year</option>
              </select>
            </div>

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
          