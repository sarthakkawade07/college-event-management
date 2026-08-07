import "./Registration.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

    if (!formData.fullName.trim()) {
      alert("Please Enter Full Name");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please Enter Email");
      return;
    }

    if (!formData.mobile.trim()) {
      alert("Please Enter Mobile Number");
      return;
    }

    if (!formData.college.trim()) {
      alert("Please Enter College Name");
      return;
    }

    if (!formData.department.trim()) {
      alert("Please Enter Department");
      return;
    }

    if (!formData.year) {
      alert("Please Select Year");
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

  if (!selectedEvent) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="registration-container">
      <div className="registration-card">

        <h1>Event Registration</h1>

        <p className="event-name">
          {selectedEvent.title}
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>👤 Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>📧 Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>📱 Mobile Number</label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>🏫 College Name</label>
            <input
              type="text"
              name="college"
              placeholder="Enter College Name"
              value={formData.college}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>💻 Department</label>
            <input
              type="text"
              name="department"
              placeholder="Enter Department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>🎓 Year</label>

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

          <button type="submit">
            Continue To Payment →
          </button>

        </form>

      </div>
    </div>
  );
}

export default Registration;