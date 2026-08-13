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

      {/* IMAGE */}
      <div className="event-image-wrapper">
        <img
          src={
            image ||
            "https://via.placeholder.com/600x400?text=No+Image"
          }
          alt={title}
          className="event-card-image"
        />
      </div>

      {/* CONTENT */}
      <div className="event-card-content">

        {/* CATEGORY */}
        <span className="event-card-category">
          {category || "Event"}
        </span>

        {/* TITLE */}
        <h3 className="event-card-title">
          {title}
        </h3>

        {/* DATE */}
        <div className="event-card-info">
          <span className="event-info-icon">
            📅
          </span>

          <span>
            {date || "Date TBA"}
          </span>
        </div>

        {/* LOCATION */}
        <div className="event-card-info">
          <span className="event-info-icon">
            📍
          </span>

          <span>
            {location || "College Campus"}
          </span>
        </div>

        {/* BOTTOM */}
        <div className="event-card-bottom">

          {/* FEE */}
          <h4 className="event-card-fee">
            {fee && Number(fee) > 0
              ? `₹${fee}`
              : "Free"}
          </h4>

          {/* DETAILS */}
          <Link
            to={`/events/${id}`}
            className="event-details-link"
          >
            <span>View Details</span>
            <span>→</span>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default EventCard;