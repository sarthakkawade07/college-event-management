import "./EventCard.css";
import { Link } from "react-router-dom";

function EventCard({
  id,
  title,
  date,
  location,
  fee,
  category,
  image,
}) {
  return (
    <div className="event-card">

      <img
        src={
          image ||
          "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"
        }
        alt={title}
        className="event-image"
      />

      <div className="event-content">

        <span className="event-category">
          {category}
        </span>

        <h3>{title}</h3>

        <p>📅 {date}</p>

        <p>📍 {location}</p>

        <h4>
          {fee === 0 || !fee
            ? "Free"
            : `₹${fee}`}
        </h4>

        <Link to={`/events/${id}`}>
          <button className="details-btn">
            View Details
          </button>
        </Link>

      </div>

    </div>
  );
}

export default EventCard;