import "./EventDetails.css";
import { useParams } from "react-router-dom";
import eventData from "../Home/eventData";
import { Link } from "react-router-dom";

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
      <h1>{event.title}</h1>

      <p><strong>Category:</strong> {event.category}</p>

      <p><strong>Date:</strong> {event.date}</p>

      <p><strong>Venue:</strong> {event.location}</p>

      <p>
        <strong>Fee:</strong>{" "}
        {event.fee === 0 ? "Free" : `₹${event.fee}`}
      </p>

      <p><strong>Total Seats:</strong> {event.seats}</p>

      <p><strong>Available Seats:</strong> {event.availableSeats}</p>

      <p><strong>Registration Ends:</strong> {event.lastDate}</p>

      <p><strong>Organizer:</strong> {event.organizer}</p>

      <h3>Description</h3>

      <p>{event.description}</p>

      
    <Link to={`/registration/${event.id}`}>
  <button>Register Now</button>
</Link>
    </div>
  );
}

export default EventDetails;