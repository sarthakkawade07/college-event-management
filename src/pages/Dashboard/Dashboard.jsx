import "./Dashboard.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaCertificate,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Dashboard() {
  const [user, setUser] = useState(null);
const registeredEvents =
  JSON.parse(localStorage.getItem("myEvents")) || [];
useEffect(() => {
  const loggedUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  setUser(loggedUser);
}, []);
  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>Welcome, Back 👋</h1>
        <h2>{user ? user.fullName : "Guest"}</h2>
        <p>Manage your events and profile from one place.</p>
      </div>
      <div className="stats-container">

  <div className="stat-card">
    <h2>10</h2>
    <p>Total Events</p>
  </div>

  <div className="stat-card">
    <h2>{registeredEvents.length}</h2>
    <p>Registered</p>
  </div>

  <div className="stat-card">
    <h2>1</h2>
    <p>Certificates</p>
  </div>

  <div className="stat-card">
    <h2>4</h2>
    <p>Upcoming</p>
  </div>

</div>
<div className="recent-activity">

  <h2>Recent Activity</h2>

  {registeredEvents.length === 0 ? (
    <p>No recent activity found.</p>
  ) : (
    registeredEvents.map((event) => (
      <div key={event.id} className="activity-card">
        <h3>{event.title}</h3>

        <p>📅 {event.date}</p>

        <span className="activity-status">
          {event.status}
        </span>
      </div>
    ))
  )}

</div>

      <div className="dashboard-cards">

        <Link to="/events" className="dashboard-card">
          <FaCalendarAlt className="dashboard-icon" />
          <h2>Events</h2>
          <p>Browse all upcoming events.</p>
        </Link>

        <Link to="/my-events" className="dashboard-card">
          <FaCalendarAlt className="dashboard-icon" />
          <h2>My Events</h2>
          <p>View your registered events.</p>
        </Link>

        <Link to="/certificates" className="dashboard-card">
          <FaCertificate className="dashboard-icon" />
          <h2>Certificates</h2>
          <p>Download your certificates.</p>
        </Link>

        <Link to="/profile" className="dashboard-card">
          <FaUser className="dashboard-icon" />
          <h2>Profile</h2>
          <p>View and edit your profile.</p>
        </Link>

        <Link to="/login" className="dashboard-card logout-card">
          <FaSignOutAlt className="dashboard-icon" />
          <h2>Logout</h2>
          <p>Sign out from your account.</p>
        </Link>

      </div>

    </div>
  );
}

export default Dashboard;