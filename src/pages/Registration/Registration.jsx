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
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaArrowRight,
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
      alert("Please fill all fields.");
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
    return (
      <div className="loading-page">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="registration-page">

      <div className="registration-container">

        {/* LEFT PANEL */}

        <div className="left-panel">

          <span className="badge">
            EVENT REGISTRATION
          </span>

          <h1>
            Register
            <br />
            For Event
          </h1>

          <p>
            Complete your registration to participate in the event.
          </p>

          <div className="event-card">

            <h2>{selectedEvent.title}</h2>

            <div className="event-item">
              <FaCalendarAlt />
              <span>{selectedEvent.date}</span>
            </div>

            <div className="event-item">
              <FaMapMarkerAlt />
              <span>{selectedEvent.venue}</span>
            </div>

            <div className="event-item">
              <FaMoneyBillWave />
              <span>
                {selectedEvent.fee === 0
                  ? "Free"
                  : `₹${selectedEvent.fee}`}
              </span>
            </div>

            <p className="event-desc">
              {selectedEvent.description}
            </p>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="right-panel">

          <div className="form-header">
            <h2>Event Registration</h2>
            <p>
              Fill in your details below
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
              />
            </div>

            <div className="input-box">
              <FaGraduationCap />
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

            <button
              type="submit"
              className="register-btn"
            >
              Continue To Payment
              <FaArrowRight />
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Registration;