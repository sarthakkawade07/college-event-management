import "./Events.css";
import { useEffect, useState } from "react";
import EventCard from "../../components/event/EventCard";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setEvents(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || event.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="events-page">
      <h1>All Events</h1>

      <p className="subtitle">
        Discover exciting college events and register today.
      </p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-buttons">
        <button onClick={() => setCategory("All")}>All</button>
        <button onClick={() => setCategory("Technical")}>Technical</button>
        <button onClick={() => setCategory("Coding")}>Coding</button>
        <button onClick={() => setCategory("Competition")}>Competition</button>
      </div>

      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              id={event._id}
              title={event.title}
              date={event.date}
              location={event.venue}
              fee={event.fee}
              category={event.category}
              image={event.image}
            />
          ))
        ) : (
          <h2>No Event Found</h2>
        )}
      </div>
    </div>
  );
}

export default Events;