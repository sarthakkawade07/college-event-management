import "./EventCard.css";
import { Link } from "react-router-dom";

function EventCard({ id, title, date, location, fee, category }) {
  return (
    <div className="event-card">
      <span className="event-category">{category}</span>

      <h3>{title}</h3>

      <p>📅 {date}</p>
      <p>📍 {location}</p>

      <h4>{fee === 0 ? "Free" : `₹${fee}`}</h4>

    <Link to={`/events/${id}`}>
             <button>View Details</button>
    </Link>
    </div>
  );
}

export default EventCard;