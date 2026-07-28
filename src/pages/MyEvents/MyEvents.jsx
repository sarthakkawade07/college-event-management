import "./MyEvents.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyEvents() {
  const [myEvents, setMyEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const events =
      JSON.parse(localStorage.getItem("myEvents")) || [];

    setMyEvents(events);
  }, []);

  // Open Modal
  const handleWithdraw = (id) => {
    setSelectedEventId(id);
    setShowModal(true);
  };

  // Confirm Withdraw
  const confirmWithdraw = () => {
    const updatedEvents = myEvents.filter(
      (event) => event.id !== selectedEventId
    );

    localStorage.setItem(
      "myEvents",
      JSON.stringify(updatedEvents)
    );

    setMyEvents(updatedEvents);
    setShowModal(false);

    alert("Registration Withdrawn Successfully!");
  };

  // Cancel Withdraw
  const cancelWithdraw = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="my-events-page">

        <h1>My Events</h1>

        {myEvents.length === 0 ? (
          <h2 className="no-events">
            No Registered Events
          </h2>
        ) : (
          <div className="events-container">

            {myEvents.map((event) => (
              <div className="event-card" key={event.id}>

                <h2>{event.title}</h2>

                <p>
                  <strong>Date:</strong> {event.date}
                </p>

                <p>
                  <strong>Status:</strong>

                  <span
                    className={
                      event.status === "Completed"
                        ? "completed"
                        : "registered"
                    }
                  >
                    {" "}
                    {event.status}
                  </span>
                </p>

                <button
                  onClick={() =>
                    navigate(`/events/${event.id}`)
                  }
                >
                  View Details
                </button>

                <button
                  className="withdraw-btn"
                  onClick={() =>
                    handleWithdraw(event.id)
                  }
                >
                  Withdraw
                </button>

              </div>
            ))}

          </div>
        )}

      </div>

      {showModal && (
        <div className="modal-overlay">

          <div className="modal-box">

            <h2>Withdraw Registration</h2>

            <p>
              Are you sure you want to withdraw from
              this event?
            </p>

            <div className="modal-buttons">

              <button
                className="yes-btn"
                onClick={confirmWithdraw}
              >
                Yes
              </button>

              <button
                className="no-btn"
                onClick={cancelWithdraw}
              >
                No
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default MyEvents;