import "./EventDetails.css";
import { useParams, Link } from "react-router-dom";
import eventData from "../Home/eventData";

function EventDetails() {
  const { id } = useParams();

  const adminEvents =
    JSON.parse(localStorage.getItem("events")) || [];

  const allEvents = [...eventData, ...adminEvents];

  const event = allEvents.find(
    (item) => item.id === Number(id)
  );

  if (!event) {
    return <h2>Event Not Found</h2>;
  }

  return (
    <div className="event-details">

      {/* Event Image */}

      <img
        src={
          event.image ||
          "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200"
        }
        alt={event.title}
        className="event-banner"
      />

      <div className="event-content">

        <h1>{event.title}</h1>

        <div className="event-info">

          <p><strong>Category:</strong> {event.category}</p>

          <p><strong>Date:</strong> {event.date}</p>

          <p><strong>Time:</strong> {event.time || "10:00 AM"}</p>

          <p>
            <strong>Venue:</strong>{" "}
            {event.venue || event.location}
          </p>

          <p>
            <strong>Fee:</strong>{" "}
            {event.fee === 0 || !event.fee
              ? "Free"
              : `₹${event.fee}`}
          </p>

          <p>
            <strong>Total Seats:</strong>{" "}
            {event.seats}
          </p>

          <p>
            <strong>Available Seats:</strong>{" "}
            {event.availableSeats || event.seats}
          </p>

          <p>
            <strong>Registration Ends:</strong>{" "}
            {event.lastDate || event.date}
          </p>

          <p>
            <strong>Organizer:</strong>{" "}
            {event.organizer || "College Event Committee"}
          </p>

        </div>

        <div className="description-box">

          <h2>Description</h2>

          <p>{event.description}</p>

        </div>
        <div className="benefits-box">

  <h2>🎁 Event Benefits</h2>

  <div className="benefits-grid">

    <div className="benefit-card">
      🏆
      <h4>Certificate</h4>
      <p>Participation Certificate</p>
    </div>

    <div className="benefit-card">
      🎁
      <h4>Exciting Prizes</h4>
      <p>Win Amazing Rewards</p>
    </div>

    <div className="benefit-card">
      🤝
      <h4>Networking</h4>
      <p>Meet Industry Experts</p>
    </div>

    <div className="benefit-card">
      📚
      <h4>Learning</h4>
      <p>Hands-on Experience</p>
    </div>

  </div>

</div>

<div className="rating-box">

  <h2>⭐⭐⭐⭐⭐</h2>

  <p>Rated 4.9 / 5 by Students</p>

</div>

        <Link to={`/registration/${event.id}`}>
          <button className="register-btn">
            Register Now
          </button>
        </Link>

      </div>

    </div>
  );
}

export default EventDetails;