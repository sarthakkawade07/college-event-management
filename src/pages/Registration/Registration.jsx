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
    const loadEvent = async () => {
      try {
        const res = await fetch(
          `https://college-event-management-backend-2mzu.onrender.com/api/events/${id}`
        );

        if (!res.ok) {
          alert("Event not found");
          navigate("/events");
          return;
        }

        const data = await res.json();
        setSelectedEvent(data);
      } catch (err) {
        console.log(err);
        alert("Server Error");
        navigate("/events");
      }
    };

    loadEvent();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedEvent || !selectedEvent._id) {
      alert("Event is loading. Please wait...");
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
        ...formData,
        eventId: selectedEvent._id,
        eventTitle: selectedEvent.title,
        amount: selectedEvent.fee,
      })
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

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
          />

          <input
            type="text"
            name="college"
            placeholder="College"
            value={formData.college}
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
          />

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

          <button type="submit">
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;