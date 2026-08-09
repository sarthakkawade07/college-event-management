import "./MyEvents.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyEvents() {
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Withdraw Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  // View Details Modal
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const navigate = useNavigate();

  // ==========================================
  // GET PAYMENTS
  // ==========================================

  useEffect(() => {
    fetch(
      "https://college-event-management-backend-2mzu.onrender.com/api/payments"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("PAYMENT API RESPONSE:", data);

        setMyEvents(data.payments || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log("PAYMENT FETCH ERROR:", error);
        setLoading(false);
      });
  }, []);

  // ==========================================
  // VIEW DETAILS
  // ==========================================

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedEvent(null);
  };

  // ==========================================
  // WITHDRAW
  // ==========================================

  const handleWithdraw = (paymentId) => {
    setSelectedPaymentId(paymentId);
    setShowModal(true);
  };

  // ==========================================
  // CONFIRM WITHDRAW
  // ==========================================

  const confirmWithdraw = async () => {
    if (!selectedPaymentId) return;

    try {
      const res = await fetch(
        `https://college-event-management-backend-2mzu.onrender.com/api/payments/${selectedPaymentId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMyEvents((prevEvents) =>
          prevEvents.filter(
            (event) => event._id !== selectedPaymentId
          )
        );

        setShowModal(false);
        setSelectedPaymentId(null);

        // जर details modal open असेल तर बंद कर
        setShowDetails(false);
        setSelectedEvent(null);

        alert("Registration Withdrawn Successfully!");
      } else {
        alert(data.message || "Unable to withdraw");
      }
    } catch (error) {
      console.log("WITHDRAW ERROR:", error);
      alert("Server Error");
    }
  };

  // ==========================================
  // CANCEL WITHDRAW
  // ==========================================

  const cancelWithdraw = () => {
    setShowModal(false);
    setSelectedPaymentId(null);
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="my-events-loading">
        <div className="loading-spinner"></div>
        <p>Loading Registered Events...</p>
      </div>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <div className="my-events-page">

      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <div className="my-events-header">

        <div className="header-icon">
          🎟️
        </div>

        <div>
          <h1>My Registered Events</h1>

          <p className="my-events-subtitle">
            Your registered events and payment details
          </p>
        </div>

      </div>


      {/* ========================================
          NO EVENTS
      ======================================== */}

      {myEvents.length === 0 ? (

        <div className="no-events-box">

          <div className="no-events-icon">
            🎫
          </div>

          <h2>
            No Registered Events Yet
          </h2>

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

        /* ======================================
           EVENTS CONTAINER
        ====================================== */

        <div className="events-container">

          {myEvents.map((event) => (

            <div
              className="event-card"
              key={event._id}
            >

              {/* Card Header */}

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


              {/* Event Title */}

              <h2>
                {event.eventTitle}
              </h2>


              {/* Student */}

              <p>
                <strong>
                  👤 Student :
                </strong>{" "}
                {event.name || "-"}
              </p>


              {/* Email */}

              <p>
                <strong>
                  📧 Email :
                </strong>{" "}
                {event.email || "-"}
              </p>


              {/* Amount */}

              <p>
                <strong>
                  💰 Amount :
                </strong>{" "}
                {event.amount === 0
                  ? "Free"
                  : `₹${event.amount}`}
              </p>


              {/* Transaction */}

              <p>
                <strong>
                  🆔 Transaction ID :
                </strong>

                <br />

                <span className="transaction-id">
                  {event.transactionId || "-"}
                </span>
              </p>


              {/* Payment Status */}

              <p>
                <strong>
                  💳 Payment :
                </strong>{" "}

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

              </p>


              {/* Registered Date */}

              <p>
                <strong>
                  📅 Registered On :
                </strong>{" "}

                {event.createdAt
                  ? new Date(
                      event.createdAt
                    ).toLocaleDateString("en-GB")
                  : "-"}
              </p>


              {/* Buttons */}

              <div className="event-buttons">

                {/* VIEW DETAILS */}

                <button
                  className="view-details-btn"
                  onClick={() =>
                    handleViewDetails(event)
                  }
                >
                  👁️ View Details
                </button>


                {/* WITHDRAW */}

                <button
                  className="withdraw-btn"
                  onClick={() =>
                    handleWithdraw(event._id)
                  }
                >
                  🗑️ Withdraw
                </button>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* =====================================================
          VIEW DETAILS MODAL
      ===================================================== */}

      {showDetails && selectedEvent && (

        <div
          className="details-overlay"
          onClick={closeDetails}
        >

          <div
            className="details-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* =====================================
                TOP PURPLE LINE
            ===================================== */}

            <div className="details-top-line"></div>


            {/* =====================================
                HEADER
            ===================================== */}

            <div className="details-header">

              <div className="details-icon">
                📄
              </div>


              <div className="details-title">

                <span>
                  REGISTRATION
                </span>

                <h1>
                  {selectedEvent.eventTitle}
                </h1>

                <p>
                  📅 Event Registration Details
                </p>

              </div>


              {/* STATUS */}

              <div
                className={
                  selectedEvent.status === "Approved"
                    ? "details-status approved"
                    : selectedEvent.status === "Rejected"
                    ? "details-status rejected"
                    : "details-status pending"
                }
              >
                {selectedEvent.status || "Pending"}
              </div>

            </div>


            {/* =====================================
                STUDENT / EMAIL / AMOUNT
            ===================================== */}

            <div className="details-info-card">


              {/* Student */}

              <div className="details-info-item">

                <div className="details-info-icon">
                  👤
                </div>

                <div>

                  <small>
                    Student
                  </small>

                  <strong>
                    {selectedEvent.name || "-"}
                  </strong>

                </div>

              </div>


              {/* Email */}

              <div className="details-info-item">

                <div className="details-info-icon">
                  ✉️
                </div>

                <div>

                  <small>
                    Email
                  </small>

                  <strong>
                    {selectedEvent.email || "-"}
                  </strong>

                </div>

              </div>


              {/* Amount */}

              <div className="details-info-item">

                <div className="details-info-icon">
                  ₹
                </div>

                <div>

                  <small>
                    Amount
                  </small>

                  <strong>
                    {selectedEvent.amount === 0
                      ? "FREE"
                      : `₹${selectedEvent.amount}`}
                  </strong>

                </div>

              </div>

            </div>


            {/* =====================================
                TRANSACTION DETAILS
            ===================================== */}

            <div className="transaction-details">

              <h3>
                🆔 Transaction Details
              </h3>


              <div className="transaction-box">

                <small>
                  Transaction ID
                </small>

                <strong>
                  {selectedEvent.transactionId || "-"}
                </strong>

                <button
                  className="copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      selectedEvent.transactionId || ""
                    );

                    alert(
                      "Transaction ID Copied!"
                    );
                  }}
                >
                  📋
                </button>

              </div>

            </div>


            {/* =====================================
                PAYMENT + REGISTERED DATE
            ===================================== */}

            <div className="details-info-card bottom-info">


              {/* Payment */}

              <div className="details-info-item">

                <div className="details-info-icon">
                  💳
                </div>

                <div>

                  <small>
                    Payment Status
                  </small>

                  <strong
                    className={
                      selectedEvent.status === "Approved"
                        ? "text-approved"
                        : selectedEvent.status === "Rejected"
                        ? "text-rejected"
                        : "text-pending"
                    }
                  >
                    {selectedEvent.status || "Pending"}
                  </strong>

                </div>

              </div>


              {/* Date */}

              <div className="details-info-item">

                <div className="details-info-icon">
                  📅
                </div>

                <div>

                  <small>
                    Registered On
                  </small>

                  <strong>
                    {selectedEvent.createdAt
                      ? new Date(
                          selectedEvent.createdAt
                        ).toLocaleDateString(
                          "en-GB"
                        )
                      : "-"}
                  </strong>

                </div>

              </div>

            </div>


            {/* =====================================
                WHAT HAPPENS NEXT
            ===================================== */}

            <div
              className={
                selectedEvent.status === "Rejected"
                  ? "next-info rejected-info"
                  : selectedEvent.status === "Approved"
                  ? "next-info approved-info"
                  : "next-info"
              }
            >

              <h3>
                ℹ️ What happens next?
              </h3>


              {selectedEvent.status ===
              "Approved" ? (

                <p>
                  Your payment has been approved.
                  Your registration is confirmed
                  and you are now a participant
                  of this event.
                </p>

              ) : selectedEvent.status ===
                "Rejected" ? (

                <p>
                  Your payment was rejected by
                  the administrator. Please check
                  your payment details and try again.
                </p>

              ) : (

                <p>
                  Your registration is currently
                  pending. Once the payment is
                  confirmed, your registration will
                  be approved.
                </p>

              )}

            </div>


            {/* =====================================
                CLOSE BUTTON
            ===================================== */}

            <button
              className="details-close-btn"
              onClick={closeDetails}
            >
              ✕ Close Details
            </button>


            {/* =====================================
                HELP
            ===================================== */}

            <div className="details-help">

              <div>
                🎧
                <strong>
                  Need help?
                </strong>
              </div>

              <p>
                Contact our support team for
                any assistance.
              </p>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          WITHDRAW MODAL
      ===================================================== */}

      {showModal && (

        <div
          className="modal-overlay"
          onClick={cancelWithdraw}
        >

          <div
            className="modal-box"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

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

    </div>
  );
}

export default MyEvents;