import "./MyEvents.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyEvents() {
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  const navigate = useNavigate();

  // ==============================
  // Logged In User
  // ==============================

  const registrationData =
    JSON.parse(localStorage.getItem("registrationData")) || {};

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser")) || {};

  const userEmail =
    registrationData.email || loggedInUser.email || "";

  // ==============================
  // Fetch My Registered Events
  // ==============================

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await fetch(
          "https://college-event-management-backend-2mzu.onrender.com/api/payments"
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "Failed to fetch payments"
          );
        }

        const payments = data.payments || [];

        // फक्त current student चे payments
        const filteredPayments = payments.filter(
          (payment) =>
            payment.email &&
            userEmail &&
            payment.email.toLowerCase() ===
              userEmail.toLowerCase()
        );

        setMyEvents(filteredPayments);
      } catch (error) {
        console.log("My Events Error:", error);
        setMyEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [userEmail]);

  // ==============================
  // Withdraw Button
  // ==============================

  const handleWithdraw = (paymentId) => {
    setSelectedPaymentId(paymentId);
    setShowModal(true);
  };

  // ==============================
  // Confirm Withdraw
  // ==============================

  const confirmWithdraw = async () => {
    if (!selectedPaymentId) {
      return;
    }

    try {
      const res = await fetch(
        `https://college-event-management-backend-2mzu.onrender.com/api/payments/${selectedPaymentId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        const updatedEvents = myEvents.filter(
          (event) => event._id !== selectedPaymentId
        );

        setMyEvents(updatedEvents);

        setShowModal(false);
        setSelectedPaymentId(null);

        alert("Registration Withdrawn Successfully!");
      } else {
        alert(
          data.message || "Unable to withdraw registration"
        );
      }
    } catch (error) {
      console.log("Withdraw Error:", error);
      alert("Server Error");
    }
  };

  // ==============================
  // Cancel Withdraw
  // ==============================

  const cancelWithdraw = () => {
    setShowModal(false);
    setSelectedPaymentId(null);
  };

  // ==============================
  // Loading
  // ==============================

  if (loading) {
    return (
      <div className="my-events-page">
        <h2 className="no-events">
          Loading Registered Events...
        </h2>
      </div>
    );
  }

  // ==============================
  // Main UI
  // ==============================

  return (
    <>
      <div className="my-events-page">

        <h1>🎟 My Registered Events</h1>

        <p className="my-events-subtitle">
          Events you have registered and made payment for
        </p>

        {myEvents.length === 0 ? (

          <div className="no-events-box">

            <div className="no-events-icon">
              🎫
            </div>

            <h2>No Registered Events Yet</h2>

            <p>
              You haven't registered for any event yet.
            </p>

            <button
              onClick={() => navigate("/events")}
            >
              Explore Events
            </button>

          </div>

        ) : (

          <div className="events-container">

            {myEvents.map((event) => (

              <div
                className="event-card"
                key={event._id}
              >

                {/* =========================
                    Event Header
                ========================== */}

                <div className="event-card-header">

                  <span className="event-badge">
                    REGISTERED
                  </span>

                  <span
                    className={
                      event.status === "Approved"
                        ? "payment-status approved"
                        : event.status === "Rejected"
                        ? "payment-status rejected"
                        : "payment-status pending"
                    }
                  >
                    {event.status || "Pending"}
                  </span>

                </div>

                {/* =========================
                    Event Title
                ========================== */}

                <h2>
                  {event.eventTitle}
                </h2>

                {/* =========================
                    Student
                ========================== */}

                <p>
                  <strong>👤 Student :</strong>{" "}
                  {event.name || "-"}
                </p>

                {/* =========================
                    Email
                ========================== */}

                <p>
                  <strong>📧 Email :</strong>{" "}
                  {event.email || "-"}
                </p>

                {/* =========================
                    Amount
                ========================== */}

                <p>
                  <strong>💰 Amount :</strong>{" "}
                  {event.amount === 0
                    ? "Free"
                    : `₹${event.amount}`}
                </p>

                {/* =========================
                    Transaction ID
                ========================== */}

                <p>
                  <strong>
                    🆔 Transaction ID :
                  </strong>

                  <br />

                  <span className="transaction-id">
                    {event.transactionId || "-"}
                  </span>
                </p>

                {/* =========================
                    Payment Status
                ========================== */}

                <p>
                  <strong>💳 Payment :</strong>{" "}

                  <span
                    className={
                      event.status === "Approved"
                        ? "approved"
                        : event.status === "Rejected"
                        ? "rejected"
                        : "pending"
                    }
                  >
                    {event.status || "Pending"}
                  </span>
                </p>

                {/* =========================
                    Registered Date
                ========================== */}

                {event.createdAt && (
                  <p>
                    <strong>
                      📅 Registered On :
                    </strong>{" "}
                    {new Date(
                      event.createdAt
                    ).toLocaleDateString()}
                  </p>
                )}

                {/* =========================
                    Buttons
                ========================== */}

                <div className="event-buttons">

                  <button
                    onClick={() =>
                      navigate(
                        `/events/${event.eventId}`
                      )
                    }
                  >
                    View Details
                  </button>

                  {event.status !== "Approved" && (
                    <button
                      className="withdraw-btn"
                      onClick={() =>
                        handleWithdraw(event._id)
                      }
                    >
                      Withdraw
                    </button>
                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* ==============================
          Withdraw Modal
      ============================== */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal-box">

            <h2>
              Withdraw Registration
            </h2>

            <p>
              Are you sure you want to withdraw
              from this event?
            </p>

            <div className="modal-buttons">

              <button
                className="yes-btn"
                onClick={confirmWithdraw}
              >
                Yes, Withdraw
              </button>

              <button
                className="no-btn"
                onClick={cancelWithdraw}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default MyEvents;