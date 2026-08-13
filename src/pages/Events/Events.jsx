import "./Events.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EventCard from "../../components/event/EventCard";

import {
  FaThLarge,
  FaCode,
  FaDesktop,
  FaTrophy,
} from "react-icons/fa";

function Events() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // ==============================
  // FETCH EVENTS FROM BACKEND
  // ==============================

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

      return Array.isArray(data)
        ? data
        : data.events || [];
    },

    staleTime: 5 * 60 * 1000,
  });

  // ==============================
  // LOADING
  // ==============================

  if (isLoading) {
    return (
      <div className="events-loading">
        <div className="loading-spinner"></div>
        <h2>Loading Events...</h2>
        <p>Please wait while we fetch the latest events.</p>
      </div>
    );
  }

  // ==============================
  // ERROR
  // ==============================

  if (isError) {
    return (
      <div className="events-error">
        <h2>Failed to Load Events</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  // ==============================
  // SEARCH + CATEGORY FILTER
  // ==============================

  const filteredEvents = events.filter((event) => {
    const matchSearch = event.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||
      event.category === category;

    return matchSearch && matchCategory;
  });

  // ==============================
  // UI
  // ==============================

  return (
    <div className="events-page">

      {/* TOP BADGE */}

      <div className="events-badge">
        🎉 Explore & Register
      </div>

      {/* HEADING */}

      <h1>
        All <span>Events</span>
      </h1>

      <p className="subtitle">
        Discover exciting college events and register today.
      </p>

      {/* SEARCH */}

      <div className="search-box">

        <span className="search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search events, workshops, hackathons..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* FILTER BUTTONS */}

      <div className="filter-buttons">

        <button
          className={
            category === "All"
              ? "active"
              : ""
          }
          onClick={() =>
            setCategory("All")
          }
        >
          <FaThLarge />
          <span>All Events</span>
        </button>

        <button
          className={
            category === "Technical"
              ? "active"
              : ""
          }
          onClick={() =>
            setCategory("Technical")
          }
        >
          <FaCode />
          <span>Technical</span>
        </button>

        <button
          className={
            category === "Coding"
              ? "active"
              : ""
          }
          onClick={() =>
            setCategory("Coding")
          }
        >
          <FaDesktop />
          <span>Coding</span>
        </button>

        <button
          className={
            category === "Competition"
              ? "active"
              : ""
          }
          onClick={() =>
            setCategory("Competition")
          }
        >
          <FaTrophy />
          <span>Competition</span>
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

          <div className="no-events">

            <div className="no-events-icon">
              📅
            </div>

            <h2>
              No Events Found
            </h2>

            <p>
              Try another search or category.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default Events;