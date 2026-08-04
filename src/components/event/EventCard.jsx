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
        src={image || "https://via.placeholder.com/300x180?text=No+Image"}
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
          {fee && fee > 0 ? `₹${fee}` : "Free"}
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