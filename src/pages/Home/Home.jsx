import "./Home.css";
import EventCard from "../../components/event/EventCard";
import eventData from "./eventData";

function Home() {
  return (
    <main className="home">

      <section className="hero">

        <h1>Campus Event Hub</h1>

        <p>
          Discover, Register and Participate in exciting college events
          from one place.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary">
            Explore Events
          </button>

          <button className="btn-secondary">
            Learn More
          </button>
        </div>

        <div className="hero-stats">

          <div className="stat-card">
            <h2>500+</h2>
            <p>Students</p>
          </div>

          <div className="stat-card">
            <h2>100+</h2>
            <p>Events</p>
          </div>

          <div className="stat-card">
            <h2>50+</h2>
            <p>Organizers</p>
          </div>

          <div className="stat-card">
            <h2>25+</h2>
            <p>Departments</p>
          </div>

        </div>

      </section>

      <section className="events-section">

        <h2>Upcoming Events</h2>

        <div className="events-container">

          {eventData.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              location={event.location}
              fee={event.fee}
              category={event.category}
              image={event.image}
            />
          ))}

        </div>

      </section>

    </main>
  );
}

export default Home;