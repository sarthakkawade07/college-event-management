import "./Registration.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import eventData from "../Home/eventData";
import { useEvent } from "../../context/EventContext";

function Registration() {
  const { addParticipant } = useEvent();
  const { id } = useParams();
  const navigate = useNavigate();

  const adminEvents =
    JSON.parse(localStorage.getItem("events")) || [];

  const allEvents = [...eventData, ...adminEvents];

  const selectedEvent = allEvents.find(
    (item) => item.id === Number(id)
  );

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.fullName.trim() === "") {
      alert("Please enter your full name.");
      return;
    }

    if (formData.email.trim() === "") {
      alert("Please enter your email.");
      return;
    }

    if (!formData.email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    if (formData.mobile.length !== 10) {
      alert("Please enter a valid mobile number.");
      return;
    }

    if (formData.college.trim() === "") {
      alert("Please enter college name.");
      return;
    }

    if (formData.department.trim() === "") {
      alert("Please enter department.");
      return;
    }

    if (formData.year === "") {
      alert("Please select your year.");
      return;
    }

    const registrationData = {
  eventId: selectedEvent._id,
  eventTitle: selectedEvent.title,
  fullName: formData.fullName,
  email: formData.email,
  mobile: formData.mobile,
  college: formData.college,
  department: formData.department,
  year: formData.year,
  amount: selectedEvent.fee,
};

localStorage.setItem(
  "registrationData",
  JSON.stringify(registrationData)
);

navigate(`/payment/${selectedEvent._id}`);
  };

  return (
    <div className="registration-container">
      <div className="registration-card">

        <h1>Event Registration</h1>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>College Name</label>
            <input
              type="text"
              name="college"
              placeholder="Enter college name"
              value={formData.college}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              placeholder="Enter department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
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

          <button type="submit">
            Continue to Payment
          </button>

        </form>

      </div>
    </div>
  );
}

export default Registration;