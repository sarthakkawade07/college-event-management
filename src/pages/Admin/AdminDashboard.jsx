import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./AdminDashboard.css";

import DashboardChart from "../../components/charts/DashboardChart";
import RegistrationChart from "../../components/charts/RegistrationChart.jsx";
import { useEvent } from "../../context/EventContext";

import {
  FaBell,
  FaMoon,
  FaSun,
  FaClock,
  FaCalendarAlt,
  FaUsers,
  FaClipboardList,
  FaChartLine,
  FaFilePdf,
  FaFileExcel,
  FaSearch,
  FaTrash,
} from "react-icons/fa";

function AdminDashboard() {
  const {
    events,
    participants,
    setParticipants,
  } = useEvent();

  const navigate = useNavigate();

  // ==========================================
  // DARK MODE
  // ==========================================

  const [darkMode, setDarkMode] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("darkMode")) ||
      false
    );
  });

  // ==========================================
  // TANSTACK QUERY - CURRENT TIME
  // ==========================================

  const { data: currentTime } = useQuery({
    queryKey: ["admin-current-time"],

    queryFn: () => {
      return new Date().toLocaleTimeString("en-IN");
    },

    refetchInterval: 1000,

    staleTime: 0,
  });

  // ==========================================
  // OTHER STATES
  // ==========================================

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [search, setSearch] = useState("");

  // ==========================================
  // TODAY'S DATE
  // ==========================================

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  // ==========================================
  // SEARCH PARTICIPANTS
  // ==========================================

  const filteredParticipants =
    participants.filter((item) =>
      item.fullName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  // ==========================================
  // CLEAR NOTIFICATIONS
  // ==========================================

  const clearNotifications = () => {
    if (
      window.confirm(
        "Clear all notifications?"
      )
    ) {
      localStorage.removeItem(
        "participants"
      );

      setParticipants([]);

      setShowNotifications(false);
    }
  };

  // ==========================================
  // EXPORT PDF
  // ==========================================

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "College Event Management System",
      14,
      20
    );

    doc.setFontSize(14);

    doc.text(
      "Participants Report",
      14,
      30
    );

    autoTable(doc, {
      startY: 40,

      head: [
        [
          "Name",
          "Email",
          "Mobile",
          "Event",
        ],
      ],

      body: participants.map((p) => [
        p.fullName,
        p.email,
        p.mobile,
        p.eventTitle,
      ]),
    });

    doc.save(
      "Participants_Report.pdf"
    );
  };

  // ==========================================
  // EXPORT EXCEL
  // ==========================================

  const exportExcel = () => {
    const data = participants.map((p) => ({
      Name: p.fullName,
      Email: p.email,
      Mobile: p.mobile,
      Event: p.eventTitle,
      College: p.college,
      Department: p.department,
      Year: p.year,
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Participants"
    );

    const excelBuffer = XLSX.write(
      workbook,
      {
        bookType: "xlsx",
        type: "array",
      }
    );

    const file = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    saveAs(
      file,
      "Participants_Report.xlsx"
    );
  };

  // ==========================================
  // RECENT EVENTS
  // ==========================================

  const recentEvents =
    events.slice(-5).reverse();

  // ==========================================
  // RECENT PARTICIPANTS
  // ==========================================

  const recentParticipants =
    participants.slice(-5).reverse();

  // ==========================================
  // TOP EVENTS
  // ==========================================

  const eventStats = {};

  participants.forEach((participant) => {
    const event =
      participant.eventTitle;

    eventStats[event] =
      (eventStats[event] || 0) + 1;
  });

  const topEvents =
    Object.entries(eventStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div
      className={
        darkMode
          ? "admin-dashboard dark"
          : "admin-dashboard"
      }
    >
      {/* ================= HEADER ================= */}

      <div className="admin-header">

        <div className="header-left">

          <h1>
            👨‍💼 Admin Dashboard
          </h1>

          <p>
            Welcome back, Admin 👋
          </p>

          <span>
            {today}
          </span>

        </div>

        <div className="header-center">

          <div
            className="notification-box"
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
          >
            <FaBell className="bell-icon" />

            {participants.length > 0 && (
              <span className="notification-count">
                {participants.length}
              </span>
            )}
          </div>

          {showNotifications && (
            <div className="notification-popup">

              <div className="notification-header">

                <h3>
                  🔔 Notifications
                </h3>

                <button
                  className="clear-btn"
                  onClick={
                    clearNotifications
                  }
                >
                  <FaTrash /> Clear
                </button>

              </div>

              {participants.length === 0 ? (

                <p className="empty-text">
                  No Notifications
                </p>

              ) : (

                recentParticipants.map(
                  (user, index) => (

                    <div
                      className="notification-item"
                      key={index}
                      onClick={() =>
                        navigate(
                          "/participants"
                        )
                      }
                    >
                      <strong>
                        {user.fullName}
                      </strong>

                      <br />

                      Registered for

                      <b>
                        {" "}
                        {user.eventTitle}
                      </b>
                    </div>

                  )
                )

              )}

            </div>
          )}

        </div>

        <div className="header-right">

          {/* DARK MODE */}

          <button
            className="dark-btn"
            onClick={() => {
              const newMode =
                !darkMode;

              setDarkMode(newMode);

              localStorage.setItem(
                "darkMode",
                JSON.stringify(newMode)
              );
            }}
          >
            {darkMode ? (
              <FaSun />
            ) : (
              <FaMoon />
            )}
          </button>

          {/* SYSTEM STATUS */}

          <div className="status-box">

            <h3>
              🟢 System Status
            </h3>

            <p>
              Running Successfully
            </p>

          </div>

          {/* CLOCK */}

          <div className="clock-box">

            <FaClock className="clock-icon" />

            <h3>
              {currentTime}
            </h3>

            <p>
              Current Time
            </p>

          </div>

        </div>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="dashboard-search">

        <FaSearch />

        <input
          type="text"
          placeholder="Search Participants..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* ================= DASHBOARD CARDS ================= */}

      <div className="dashboard-cards">

        <div className="card blue">

          <FaCalendarAlt className="dashboard-icon" />

          <h2>
            {events.length}
          </h2>

          <p>
            Total Events
          </p>

        </div>

        <div className="card green">

          <FaUsers className="dashboard-icon" />

          <h2>
            {participants.length}
          </h2>

          <p>
            Total Participants
          </p>

        </div>

        <div className="card orange">

          <FaClipboardList className="dashboard-icon" />

          <h2>
            {participants.length}
          </h2>

          <p>
            Registrations
          </p>

        </div>

        <div className="card purple">

          <FaChartLine className="dashboard-icon" />

          <h2>
            100%
          </h2>

          <p>
            System Health
          </p>

        </div>

      </div>

      {/* ================= DASHBOARD CHART ================= */}

      <div className="recent-card">

        <h2>
          📊 Dashboard Analytics
        </h2>

        <DashboardChart
          events={events}
          participants={participants}
        />

      </div>

      {/* ================= REGISTRATION CHART ================= */}

      <div className="recent-card">

        <RegistrationChart
          participants={participants}
        />

      </div>

      {/* ================= ANALYTICS ================= */}

      <div className="analytics-section">

        <div className="analytics-card">

          <h3>
            📊 Event Completion
          </h3>

          <div className="progress">

            <div
              className="progress-fill"
              style={{
                width: "85%",
              }}
            ></div>

          </div>

          <span>
            85%
          </span>

        </div>

        <div className="analytics-card">

          <h3>
            👥 Registration Growth
          </h3>

          <div className="progress">

            <div
              className="progress-fill green"
              style={{
                width: "72%",
              }}
            ></div>

          </div>

          <span>
            72%
          </span>

        </div>

        <div className="analytics-card">

          <h3>
            🏆 Success Rate
          </h3>

          <div className="progress">

            <div
              className="progress-fill orange"
              style={{
                width: "96%",
              }}
            ></div>

          </div>

          <span>
            96%
          </span>

        </div>

      </div>

      {/* ================= QUICK ACTIONS ================= */}

      <div className="quick-actions">

        <h2>
          ⚡ Quick Actions
        </h2>

        <div className="dashboard-buttons">

          <Link to="/add-event">
            <button>
              ➕ Add Event
            </button>
          </Link>

          <Link to="/manage-events">
            <button>
              📝 Manage Events
            </button>
          </Link>

          <Link to="/participants">
            <button>
              👥 Participants
            </button>
          </Link>

          <Link to="/payment-verification">
            <button>
              💳 Payment Verification
            </button>
          </Link>

        </div>

      </div>

      {/* ================= BOTTOM SECTION ================= */}

      <div className="dashboard-bottom">

        {/* RECENT EVENTS */}

        <div className="recent-card">

          <h2>
            📅 Recent Events
          </h2>

          {recentEvents.length === 0 ? (

            <p>
              No Events Available
            </p>

          ) : (

            recentEvents.map((event) => (

              <div
                className="list-item"
                key={
                  event._id ||
                  event.id
                }
              >
                <strong>
                  {event.title}
                </strong>

                <span>
                  {event.date}
                </span>

              </div>

            ))

          )}

        </div>

        {/* RECENT PARTICIPANTS */}

        <div className="recent-card">

          <h2>
            👥 Recent Participants
          </h2>

          {filteredParticipants.length === 0 ? (

            <p>
              No Participants Found
            </p>

          ) : (

            filteredParticipants
              .slice(-5)
              .reverse()
              .map(
                (user, index) => (

                  <div
                    className="list-item"
                    key={index}
                  >

                    <strong>
                      {user.fullName}
                    </strong>

                    <span>
                      {user.eventTitle}
                    </span>

                  </div>

                )
              )

          )}

        </div>

      </div>

      {/* ================= RECENT ACTIVITY ================= */}

      <div className="recent-card activity-card">

        <h2>
          📢 Recent Activity
        </h2>

        {participants.length === 0 ? (

          <p>
            No Activity Yet
          </p>

        ) : (

          participants
            .slice(-5)
            .reverse()
            .map(
              (user, index) => (

                <div
                  className="activity-item"
                  key={index}
                >

                  🟢{" "}
                  <strong>
                    {user.fullName}
                  </strong>

                  <br />

                  Registered for

                  <b>
                    {" "}
                    {user.eventTitle}
                  </b>

                </div>

              )
            )

        )}

      </div>

      {/* ================= TOP EVENTS ================= */}

      <div className="recent-card">

        <h2>
          🏆 Top 5 Popular Events
        </h2>

        {topEvents.length === 0 ? (

          <p>
            No Data Available
          </p>

        ) : (

          topEvents.map(
            (event, index) => (

              <div
                className="list-item"
                key={index}
              >

                <strong>
                  {event[0]}
                </strong>

                <span>
                  {event[1]} Registrations
                </span>

              </div>

            )
          )

        )}

      </div>

      {/* ================= EXPORT ================= */}

      <div className="export-section">

        <button
          className="pdf-btn"
          onClick={exportPDF}
        >
          <FaFilePdf />
          Export PDF
        </button>

        <button
          className="excel-btn"
          onClick={exportExcel}
        >
          <FaFileExcel />
          Export Excel
        </button>

      </div>

      {/* ================= FOOTER ================= */}

      <div className="dashboard-footer">

        <p>
          ©{" "}
          {new Date().getFullYear()}{" "}
          College Event Management System
        </p>

        <p>
          Developed with ❤️ using React.js
        </p>

      </div>

    </div>
  );
}

export default AdminDashboard;