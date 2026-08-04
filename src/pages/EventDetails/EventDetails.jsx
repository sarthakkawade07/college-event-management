import "./EventDetails.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaUserTie,
  FaTag,
  FaGift,
  FaCertificate,
  FaLaptopCode,
  FaNetworkWired,
  FaStar,
} from "react-icons/fa";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "120px",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Loading Event...
      </div>
    );
  }

  if (!event || event.message) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "120px",
          fontSize: "35px",
          color: "#2563eb",
          fontWeight: "700",
        }}
      >
        Event Not Found
      </div>
    );
  }

  return (
    <div className="event-page">
      <section
        className="hero-banner"
        style={{
          backgroundImage: `url(${
            event.image ||
            "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600"
          })`,
        }}
      >
        <div className="hero-overlay">
          <span className="hero-category">
            {event.category}
          </span>

          <h1>{event.title}</h1>

          <p>{event.description}</p>
        </div>
      </section>

      <div className="event-wrapper">

        <div className="event-left">

          <div className="section-card">

            <h2>Event Information</h2>

            <div className="info-grid">

              <div className="info-box">
                <FaCalendarAlt />
                <div>
                  <span>Date</span>
                  <h4>{event.date}</h4>
                </div>
              </div>

              <div className="info-box">
                <FaClock />
                <div>
                  <span>Time</span>
                  <h4>{event.time}</h4>
                </div>
              </div>

              <div className="info-box">
                <FaMapMarkerAlt />
                <div>
                  <span>Venue</span>
                  <h4>{event.venue}</h4>
                </div>
              </div>

              <div className="info-box">
                <FaUserTie />
                <div>
                  <span>Organizer</span>
                  <h4>{event.organizer}</h4>
                </div>
              </div>
                            <div className="info-box">
                <FaUsers />
                <div>
                  <span>Seats</span>
                  <h4>
                    {event.availableSeats || 0} / {event.seats || 0}
                  </h4>
                </div>
              </div>

              <div className="info-box">
                <FaTag />
                <div>
                  <span>Fee</span>
                  <h4>
                    {event.fee === 0 ? "Free" : `₹${event.fee}`}
                  </h4>
                </div>
              </div>

            </div>
          </div>

          <div className="section-card">
            <h2>Description</h2>

            <p className="description">
              {event.description}
            </p>
          </div>

          <div className="section-card">
            <h2>Event Benefits</h2>

            <div className="benefits">

              <div className="benefit-card">
                <FaCertificate />
                <h4>Certificate</h4>
                <p>Participation Certificate</p>
              </div>

              <div className="benefit-card">
                <FaGift />
                <h4>Exciting Prizes</h4>
                <p>Win Amazing Rewards</p>
              </div>

              <div className="benefit-card">
                <FaNetworkWired />
                <h4>Networking</h4>
                <p>Meet Industry Experts</p>
              </div>

              <div className="benefit-card">
                <FaLaptopCode />
                <h4>Learning</h4>
                <p>Hands-on Experience</p>
              </div>

            </div>

          </div>

        </div>

        <div className="event-right">

          <div className="register-card">

            <h3>Registration</h3>

            <h1>
              {event.fee === 0 ? "FREE" : `₹${event.fee}`}
            </h1>

            <p>
              {event.availableSeats || 0} Seats Left
            </p>

            <div className="progress">
              <div
                className="progress-fill"
                style={{
                  width: `${
                    event.seats
                      ? ((event.availableSeats || 0) / event.seats) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>

            <Link to={`/registration/${event._id}`}>
              <button className="register-btn">
                Register Now
              </button>
            </Link>

          </div>

          <div className="rating-card">

            <div className="stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <p>Rated 4.9 / 5 by Students</p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EventDetails;