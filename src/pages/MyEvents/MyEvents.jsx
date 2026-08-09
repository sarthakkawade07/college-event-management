import "./MyEvents.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyEvents() {
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  const navigate = useNavigate();

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

  const handleWithdraw = (paymentId) => {
    setSelectedPaymentId(paymentId);
    setShowModal(true);
  };

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
        setMyEvents(
          myEvents.filter(
            (event) => event._id !== selectedPaymentId
          )
        );

        setShowModal(false);
        setSelectedPaymentId(null);

        alert("Registration Withdrawn Successfully!");
      } else {
        alert(data.message || "Unable to withdraw");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  const cancelWithdraw = () => {
    setShowModal(false);
    setSelectedPaymentId(null);
  };

  if (loading) {
    return (
      <div className="my-events-page">
        <h2 className="no-events">
          Loading Registered Events...
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="my-events-page">

        <h1>🎟 My Registered Events</h1>

        <p className="my-events-subtitle">
          Your registered events and payment details
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

                <h2>
                  {event.eventTitle}
                </h2>

                <p>
                  <strong>👤 Student :</strong>{" "}
                  {event.name || "-"}
                </p>

                <p>
                  <strong>📧 Email :</strong>{" "}
                  {event.email || "-"}
                </p>

                <p>
                  <strong>💰 Amount :</strong>{" "}
                  {event.amount === 0
                    ? "Free"
                    : `₹${event.amount}`}
                </p>

                <p>
                  <strong>🆔 Transaction ID :</strong>
                  <br />
                  <span className="transaction-id">
                    {event.transactionId || "-"}
                  </span>
                </p>

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

                {event.createdAt && (
                  <p>
                    <strong>📅 Registered On :</strong>{" "}
                    {new Date(
                      event.createdAt
                    ).toLocaleDateString()}
                  </p>
                )}

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

                  <button
                    className="withdraw-btn"
                    onClick={() =>
                      handleWithdraw(event._id)
                    }
                  >
                    Withdraw
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

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