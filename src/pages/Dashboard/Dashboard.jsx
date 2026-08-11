import "./Dashboard.css";
import { Link } from "react-router-dom";

import {
  FaCalendarAlt,
  FaCertificate,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Dashboard() {
  // ==========================================
  // GET LOGGED IN USER
  // ==========================================

  const user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  // ==========================================
  // GET REGISTERED EVENTS
  // ==========================================

  const registeredEvents =
    JSON.parse(
      localStorage.getItem("myEvents")
    ) || [];

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="dashboard-page">

      {/* ================= HEADER ================= */}

      <div className="dashboard-header">

        <h1>
          Welcome, Back 👋
        </h1>

        <h2>
          {user
            ? user.fullName
            : "Guest"}
        </h2>

        <p>
          Manage your events and profile
          from one place.
        </p>

      </div>

      {/* ================= RECENT ACTIVITY ================= */}

      <div className="stats-container">

        {registeredEvents.length === 0 ? (

          <p>
            No recent activity found.
          </p>

        ) : (

          registeredEvents.map((event, index) => (

            <div
              className="activity-card"
              key={
                event.id ||
                event._id ||
                index
              }
            >

              <h3>
                {event.title}
              </h3>

              <p>
                📅 {event.date}
              </p>

              <span className="activity-status">
                {event.status}
              </span>

            </div>

          ))

        )}

      </div>

      {/* ================= DASHBOARD CARDS ================= */}

      <div className="dashboard-cards">

        {/* EVENTS */}

        <Link
          to="/events"
          className="dashboard-card"
        >

          <FaCalendarAlt
            className="dashboard-icon"
          />

          <h2>
            Events
          </h2>

          <p>
            Browse all upcoming events.
          </p>

        </Link>

        {/* MY EVENTS */}

        <Link
          to="/my-events"
          className="dashboard-card"
        >

          <FaCalendarAlt
            className="dashboard-icon"
          />

          <h2>
            My Events
          </h2>

          <p>
            View your registered events.
          </p>

        </Link>

        {/* CERTIFICATES */}

        <Link
          to="/certificates"
          className="dashboard-card"
        >

          <FaCertificate
            className="dashboard-icon"
          />

          <h2>
            Certificates
          </h2>

          <p>
            Download your certificates.
          </p>

        </Link>

        {/* PROFILE */}

        <Link
          to="/profile"
          className="dashboard-card"
        >

          <FaUser
            className="dashboard-icon"
          />

          <h2>
            Profile
          </h2>

          <p>
            View and edit your profile.
          </p>

        </Link>

        {/* LOGOUT */}

        <Link
          to="/login"
          className="dashboard-card logout-card"
        >

          <FaSignOutAlt
            className="dashboard-icon"
          />

          <h2>
            Logout
          </h2>

          <p>
            Sign out from your account.
          </p>

        </Link>

      </div>

    </div>
  );
}

export default Dashboard;