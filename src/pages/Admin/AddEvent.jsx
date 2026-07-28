import { useState } from "react";
import "./AddEvent.css";

function AddEvent() {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    category: "",
    seats: "",
    image: "",
  });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const oldEvents =
      JSON.parse(localStorage.getItem("events")) || [];

    const newEvent = {
      id: Date.now(),
      ...event,
    };

    localStorage.setItem(
      "events",
      JSON.stringify([...oldEvents, newEvent])
    );

    alert("✅ Event Added Successfully!");

    setEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      venue: "",
      category: "",
      seats: "",
      image: "",
    });
  };

  return (
    <div className="add-event-page">

      <form
        className="add-event-card"
        onSubmit={handleSubmit}
      >

        <h2>Add New Event</h2>

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={event.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={event.description}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="time"
          value={event.time}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="venue"
          placeholder="Venue"
          value={event.venue}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={event.category}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="seats"
          placeholder="Total Seats"
          value={event.seats}
          onChange={handleChange}
          required
        />

        {/* Event Image */}

        <input
          type="text"
          name="image"
          placeholder="Paste Event Image URL"
          value={event.image}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Publish Event
        </button>

      </form>

    </div>
  );
}

export default AddEvent;