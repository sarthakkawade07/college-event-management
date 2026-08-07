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

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.mobile ||
      !formData.college ||
      !formData.department ||
      !formData.year
    ) {
      alert("Please Fill All Fields");
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

      <div className="glass-card">

        <h1>🎓 Event Registration</h1>

        <p className="subtitle">
          Register yourself to participate in this event
        </p>

        <div className="event-box">

          <h2>{selectedEvent.title}</h2>

          <div className="event-info">

            <p>
              <FaCalendarAlt />
              {selectedEvent.date}
            </p>

            <p>
              <FaMapMarkerAlt />
              {selectedEvent.venue}
            </p>

            <p>
              <FaMoneyBillWave />
              {selectedEvent.fee === 0
                ? "Free"
                : `₹${selectedEvent.fee}`}
            </p>

          </div>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>
              <FaUser /> Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>
              <FaEnvelope /> Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>
              <FaPhoneAlt /> Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>
              <FaUniversity /> College Name
            </label>
            <input
              type="text"
              name="college"
              placeholder="Enter College Name"
              value={formData.college}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>
              <FaLaptopCode /> Department
            </label>
            <input
              type="text"
              name="department"
              placeholder="Enter Department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>
              <FaGraduationCap /> Year
            </label>

            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
            >
              <option value="">Select Year</option>
              <option>First Year</option>
              <option>Second Year</option>
              <option>Third Year</option>
              <option>Final Year</option>
            </select>

          </div>

          <button className="register-btn" type="submit">
            Continue To Payment
            <FaArrowRight />
          </button>

        </form>

      </div>

    </div>
  );
}

export default Registration;