import "./Events.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EventCard from "../../components/event/EventCard";

function Events() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // ==========================================
  // TANSTACK QUERY - GET EVENTS
  // ==========================================

  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events"],

    queryFn: async () => {
      const response = await fetch(
        "https://college-event-management-backend-2mzu.onrender.com/api/events"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();

      console.log("EVENTS:", data);

      return data;
    },

    staleTime: 5 * 60 * 1000,
  });

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <div className="loading">
        Loading Events...
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (isError) {
    return (
      <div className="loading">
        Failed to load events.
      </div>
    );
  }

  // ==========================================
  // SEARCH + CATEGORY FILTER
  // ==========================================

  const filteredEvents = events.filter((event) => {
    const matchSearch = event.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||
      event.category === category;

    return matchSearch && matchCategory;
  });

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="events-page">

      <h1>All Events</h1>

      <p className="subtitle">
        Discover exciting college events and
        register today.
      </p>

      {/* SEARCH */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search Event..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* CATEGORY FILTER */}

      <div className="filter-buttons">

        <button
          onClick={() => setCategory("All")}
          className={
            category === "All"
              ? "active"
              : ""
          }
        >
          All
        </button>

        <button
          onClick={() =>
            setCategory("Technical")
          }
          className={
            category === "Technical"
              ? "active"
              : ""
          }
        >
          Technical
        </button>

        <button
          onClick={() =>
            setCategory("Coding")
          }
          className={
            category === "Coding"
              ? "active"
              : ""
          }
        >
          Coding
        </button>

        <button
          onClick={() =>
            setCategory("Competition")
          }
          className={
            category === "Competition"
              ? "active"
              : ""
          }
        >
          Competition
        </button>

      </div>

      {/* EVENTS */}

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

          <h2>
            No Event Found
          </h2>

        )}

      </div>

    </div>
  );
}

export default Events;