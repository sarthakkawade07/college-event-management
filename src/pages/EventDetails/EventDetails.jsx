import "./EventDetails.css";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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

  // ==========================================
  // TANSTACK QUERY - GET EVENT DETAILS
  // ==========================================

  const {
    data: event,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["event", id],

    queryFn: async () => {
      const response = await fetch(
        `https://college-event-management-backend-2mzu.onrender.com/api/events/${id}`
      );

      if (!response.ok) {
        throw new Error("Event not found");
      }

      return response.json();
    },

    enabled: !!id,
  });

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
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

  // ==========================================
  // ERROR
  // ==========================================

  if (isError || !event || event.message) {
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
    <div>

      {/* ==========================================
          HERO BANNER
      ========================================== */}

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

          <span className="event-category">
            {event.category}
          </span>

          <h1>
            {event.title}
          </h1>

          <p>
            {event.description}
          </p>

        </div>

      </section>

      {/* ==========================================
          MAIN EVENT WRAPPER
      ========================================== */}

      <div className="event-wrapper">

        {/* ==========================================
            LEFT SIDE
        ========================================== */}

        <div className="event-left">

          {/* EVENT INFORMATION */}

          <div className="section-card">

            <h2>
              Event Information
            </h2>

            <div className="info-grid">

              {/* DATE */}

              <div className="info-box">

                <FaCalendarAlt />

                <div>

                  <span>
                    Date
                  </span>

                  <h4>
                    {event.date}
                  </h4>

                </div>

              </div>

              {/* TIME */}

              <div className="info-box">

                <FaClock />

                <div>

                  <span>
                    Time
                  </span>

                  <h4>
                    {event.time}
                  </h4>

                </div>

              </div>

              {/* VENUE */}

              <div className="info-box">

                <FaMapMarkerAlt />

                <div>

                  <span>
                    Venue
                  </span>

                  <h4>
                    {event.venue}
                  </h4>

                </div>

              </div>

              {/* ORGANIZER */}

              <div className="info-box">

                <FaUserTie />

                <div>

                  <span>
                    Organizer
                  </span>

                  <h4>
                    {event.organizer}
                  </h4>

                </div>

              </div>

              {/* SEATS */}

              <div className="info-box">

                <FaUsers />

                <div>

                  <span>
                    Seats
                  </span>

                  <h4>
                    {event.availableSeats || 0}
                    {" / "}
                    {event.seats || 0}
                  </h4>

                </div>

              </div>

              {/* FEE */}

              <div className="info-box">

                <FaTag />

                <div>

                  <span>
                    Fee
                  </span>

                  <h4>

                    {Number(event.fee) === 0
                      ? "Free"
                      : `₹${event.fee}`}

                  </h4>

                </div>

              </div>

            </div>

          </div>

          {/* ==========================================
              DESCRIPTION
          ========================================== */}

          <div className="section-card">

            <h2>
              Description
            </h2>

            <p className="description">
              {event.description}
            </p>

          </div>

          {/* ==========================================
              EVENT BENEFITS
          ========================================== */}

          <div className="section-card">

            <h2>
              Event Benefits
            </h2>

            <div className="benefits">

              {/* CERTIFICATE */}

              <div className="benefit-card">

                <FaCertificate />

                <h4>
                  Certificate
                </h4>

                <p>
                  Participation Certificate
                </p>

              </div>

              {/* PRIZES */}

              <div className="benefit-card">

                <FaGift />

                <h4>
                  Exciting Prizes
                </h4>

                <p>
                  Win Amazing Rewards
                </p>

              </div>

              {/* NETWORKING */}

              <div className="benefit-card">

                <FaNetworkWired />

                <h4>
                  Networking
                </h4>

                <p>
                  Meet Industry Experts
                </p>

              </div>

              {/* LEARNING */}

              <div className="benefit-card">

                <FaLaptopCode />

                <h4>
                  Learning
                </h4>

                <p>
                  Hands-on Experience
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ==========================================
            RIGHT SIDE
        ========================================== */}

        <div className="event-right">

          {/* REGISTRATION CARD */}

          <div className="register-card">

            <h3>
              Registration
            </h3>

            <h1>

              {Number(event.fee) === 0
                ? "FREE"
                : `₹${event.fee}`}

            </h1>

            <p>
              {event.availableSeats || 0}
              {" "}Seats Left
            </p>

            {/* PROGRESS BAR */}

            <div className="progress">

              <div
                className="progress-fill"
                style={{
                  width: `${
                    event.seats
                      ? ((event.availableSeats || 0) /
                          event.seats) *
                        100
                      : 0
                  }%`,
                }}
              ></div>

            </div>

            {/* REGISTER */}

            <Link
              to={`/registration/${event._id}`}
            >

              <button className="register-btn">
                Register Now
              </button>

            </Link>

          </div>

          {/* ==========================================
              RATING
          ========================================== */}

          <div className="rating-card">

            <div className="stars">

              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />

            </div>

            <p>
              Rated 4.9 / 5 by Students
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EventDetails;