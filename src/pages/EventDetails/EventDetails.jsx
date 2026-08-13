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
  FaArrowRight,
  FaTrophy,
  FaCheckCircle,
  FaChartLine,
  FaGlobe,
  FaCode,
  FaUserGraduate,
  FaBookOpen,
} from "react-icons/fa";

function EventDetails() {
  const { id } = useParams();

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

  /* =========================
     LOADING
  ========================= */

  if (isLoading) {
    return (
      <div className="event-loading">
        <div className="loading-spinner"></div>
        <h2>Loading Event...</h2>
      </div>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (isError || !event || event.message) {
    return (
      <div className="event-error">
        <h2>Event Not Found</h2>
        <Link to="/events">← Back to Events</Link>
      </div>
    );
  }

  const availableSeats = event.availableSeats || 0;
  const totalSeats = event.seats || 0;

  const seatPercentage =
    totalSeats > 0
      ? Math.min((availableSeats / totalSeats) * 100, 100)
      : 0;

  return (
    <main className="event-details-page">

      {/* =====================================
          HERO
      ===================================== */}

      <section
        className="event-hero"
        style={{
          backgroundImage: `url(${
            event.image ||
            "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600"
          })`,
        }}
      >
<div className="event-hero-overlay">

  <div className="event-hero-content">

    {/* BACK TO HOME */}
    <Link to="/" className="back-home">
      ← Back to Home
    </Link>

    <span className="hero-category">
      {event.category || "Event"}
    </span>

    <h1>{event.title}</h1>

    <p>
      {event.description ||
        "Join this exciting college event and gain valuable experience."}
    </p>

    <div className="hero-meta">

      <div>
        <FaCalendarAlt />
        <span>
          <small>Date</small>
          {event.date || "TBA"}
        </span>
      </div>

      <div>
        <FaClock />
        <span>
          <small>Time</small>
          {event.time || "10:00 AM"}
        </span>
      </div>

      <div>
        <FaMapMarkerAlt />
        <span>
          <small>Venue</small>
          {event.venue || "College Campus"}
        </span>
      </div>

      <div>
        <FaUserTie />
        <span>
          <small>Organizer</small>
          {event.organizer || "Event Organizer"}
        </span>
      </div>

    </div>

  </div>

</div>

      </section>


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <section className="event-content">

        <div className="event-main">

          {/* EVENT INFORMATION */}

          <div className="details-card">

            <div className="card-title">
              <FaCalendarAlt />
              <h2>Event Information</h2>
            </div>

            <div className="information-grid">

              <div className="information-item blue">
                <FaCalendarAlt />
                <div>
                  <span>Date</span>
                  <strong>{event.date || "TBA"}</strong>
                </div>
              </div>

              <div className="information-item cyan">
                <FaClock />
                <div>
                  <span>Time</span>
                  <strong>{event.time || "10:00 AM"}</strong>
                </div>
              </div>

              <div className="information-item green">
                <FaMapMarkerAlt />
                <div>
                  <span>Venue</span>
                  <strong>{event.venue || "College Campus"}</strong>
                </div>
              </div>

              <div className="information-item orange">
                <FaUserTie />
                <div>
                  <span>Organizer</span>
                  <strong>{event.organizer || "Organizer"}</strong>
                </div>
              </div>

              <div className="information-item yellow">
                <FaUsers />
                <div>
                  <span>Participants</span>
                  <strong>
                    {totalSeats > 0
                      ? `${availableSeats} / ${totalSeats}`
                      : "Open"}
                  </strong>
                </div>
              </div>

              <div className="information-item pink">
                <FaTag />
                <div>
                  <span>Fee</span>
                  <strong>
                    {Number(event.fee) === 0
                      ? "Free"
                      : `₹${event.fee}`}
                  </strong>
                </div>
              </div>

            </div>

          </div>


          {/* DESCRIPTION */}

          <div className="details-card">

            <div className="card-title">
              <FaBookOpen />
              <h2>Description</h2>
            </div>

            <p className="event-description">
              {event.description ||
                "No description available for this event."}
            </p>

          </div>


          {/* EVENT HIGHLIGHTS */}

          <div className="details-card">

            <div className="card-title">
              <FaStar />
              <h2>Event Highlights</h2>
            </div>

            <div className="highlight-grid">

              <div className="highlight-card purple-light">
                <FaLaptopCode />
                <h4>Hands-on Practice</h4>
                <p>
                  Real-time practical learning experience.
                </p>
              </div>

              <div className="highlight-card blue-light">
                <FaCode />
                <h4>Practical Skills</h4>
                <p>
                  Improve your technical and coding skills.
                </p>
              </div>

              <div className="highlight-card green-light">
                <FaCheckCircle />
                <h4>Expert Guidance</h4>
                <p>
                  Learn from experienced mentors.
                </p>
              </div>

              <div className="highlight-card orange-light">
                <FaCertificate />
                <h4>Certificate</h4>
                <p>
                  Certificate for participating students.
                </p>
              </div>

              <div className="highlight-card pink-light">
                <FaGift />
                <h4>Refreshments</h4>
                <p>
                  Enjoy refreshments during the event.
                </p>
              </div>

            </div>

          </div>


          {/* EVENT BENEFITS */}

          <div className="details-card">

            <div className="card-title">
              <FaGift />
              <h2>Event Benefits</h2>
            </div>

            <div className="benefits-grid">

              <div className="benefit-card blue-benefit">
                <FaCertificate />
                <h4>Certificate</h4>
                <p>Participation Certificate</p>
              </div>

              <div className="benefit-card orange-benefit">
                <FaGift />
                <h4>Exciting Prizes</h4>
                <p>Win Amazing Rewards</p>
              </div>

              <div className="benefit-card green-benefit">
                <FaNetworkWired />
                <h4>Networking</h4>
                <p>Meet Industry Experts</p>
              </div>

              <div className="benefit-card purple-benefit">
                <FaLaptopCode />
                <h4>Learning</h4>
                <p>Hands-on Experience</p>
              </div>

            </div>

          </div>


          {/* EVENT DETAILS */}

          <div className="details-card">

            <div className="card-title">
              <FaCheckCircle />
              <h2>Event Details</h2>
            </div>

            <div className="extra-details">

              <div>
                <FaCode />
                <span>Category</span>
                <strong>{event.category || "General"}</strong>
              </div>

              <div>
                <FaUsers />
                <span>Participants</span>
                <strong>
                  {totalSeats > 0
                    ? `${availableSeats} Seats Open`
                    : "Open for All"}
                </strong>
              </div>

              <div>
                <FaChartLine />
                <span>Level</span>
                <strong>Beginner to Advanced</strong>
              </div>

              <div>
                <FaGlobe />
                <span>Language</span>
                <strong>English</strong>
              </div>

            </div>

          </div>

        </div>


        {/* =====================================
            RIGHT SIDE
        ===================================== */}

        <aside className="event-sidebar">

          {/* REGISTRATION */}

          <div className="registration-card">

            <span className="registration-label">
              Registration Fee
            </span>

            <h2>
              {Number(event.fee) === 0
                ? "FREE"
                : `₹${event.fee}`}
            </h2>

            <p>
              {availableSeats} Seats Left
            </p>

            <div className="seat-progress">
              <div
                className="seat-progress-fill"
                style={{
                  width: `${seatPercentage}%`,
                }}
              ></div>
            </div>

            <Link to={`/registration/${event._id}`}>
              <button className="register-now-btn">
                Register Now
                <FaArrowRight />
              </button>
            </Link>

          </div>


          {/* RATING */}

          <div className="rating-card">

            <div className="rating-icon">
              <FaTrophy />
            </div>

            <div className="stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <strong>4.9 / 5</strong>

            <p>Rated by Students</p>

          </div>


          {/* ORGANIZER */}

          <div className="organizer-card">

            <h3>Event Organizer</h3>

            <div className="organizer-profile">

              <div className="organizer-icon">
                <FaCode />
              </div>

              <div>
                <strong>
                  {event.organizer || "Event Organizer"}
                </strong>

                <span>Organizer</span>
              </div>

            </div>

            <p>
              We organize coding workshops, hackathons
              and technical events.
            </p>

            <button className="organizer-btn">
              View Organizer Profile
              <FaArrowRight />
            </button>

          </div>

        </aside>

      </section>

    </main>
  );
}

export default EventDetails;