import { useEffect, useState } from "react";
import "./ManageEvents.css";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

const [editedEvent, setEditedEvent] = useState({
  title: "",
  date: "",
  venue: "",
  category: "",
  fee: "",
  seats: "",
  description: "",
});
  useEffect(() => {
    const savedEvents =
      JSON.parse(localStorage.getItem("events")) || [];
    setEvents(savedEvents);
  }, []);

  // Save Edited Event
 const saveEdit = (id) => {
  const updatedEvents = events.map((event) =>
    event.id === id
      ? {
          ...event,
          ...editedEvent,
        }
      : event
  );

  setEvents(updatedEvents);

  localStorage.setItem(
    "events",
    JSON.stringify(updatedEvents)
  );

  setEditingId(null);

  alert("Event Updated Successfully!");
};
  // Delete Event
  const deleteEvent = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    const updatedEvents = events.filter(
      (event) => event.id !== id
    );

    setEvents(updatedEvents);

    localStorage.setItem(
      "events",
      JSON.stringify(updatedEvents)
    );

    alert("Event Deleted Successfully!");
  };

  // Search
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="manage-events-page">

      <h1>Manage Events</h1>

      <input
        type="text"
        placeholder="Search Event..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="events-list">

        {filteredEvents.length > 0 ? (

          filteredEvents.map((event) => (

            <div className="event-box" key={event.id}>

              {editingId === event.id ? (
                <div className="edit-form">

  <input
    type="text"
    placeholder="Event Title"
    value={editedEvent.title}
    onChange={(e) =>
      setEditedEvent({
        ...editedEvent,
        title: e.target.value,
      })
    }
  />

  <input
    type="date"
    value={editedEvent.date}
    onChange={(e) =>
      setEditedEvent({
        ...editedEvent,
        date: e.target.value,
      })
    }
  />

  <input
    type="text"
    placeholder="Venue"
    value={editedEvent.venue}
    onChange={(e) =>
      setEditedEvent({
        ...editedEvent,
        venue: e.target.value,
      })
    }
  />

  <input
    type="text"
    placeholder="Category"
    value={editedEvent.category}
    onChange={(e) =>
      setEditedEvent({
        ...editedEvent,
        category: e.target.value,
      })
    }
  />

  <input
    type="number"
    placeholder="Fee"
    value={editedEvent.fee}
    onChange={(e) =>
      setEditedEvent({
        ...editedEvent,
        fee: e.target.value,
      })
    }
  />

  <input
    type="number"
    placeholder="Seats"
    value={editedEvent.seats}
    onChange={(e) =>
      setEditedEvent({
        ...editedEvent,
        seats: e.target.value,
      })
    }
  />

  <textarea
    placeholder="Description"
    value={editedEvent.description}
    onChange={(e) =>
      setEditedEvent({
        ...editedEvent,
        description: e.target.value,
      })
    }
  />

</div>
              ) : (
                <h2>{event.title}</h2>
              )}

              <p>📅 {event.date}</p>

              <p>📍 {event.venue}</p>

              <p>🏷 {event.category}</p>

              <p>👥 {event.seats} Seats</p>

              <div className="btn-group">

                {editingId === event.id ? (
                  <button
                    className="edit-btn"
                    onClick={() => saveEdit(event.id)}
                  >
                    💾 Save
                  </button>
                ) : (
                  <button
                    className="edit-btn"
                    onClick={() => {
  setEditingId(event.id);

  setEditedEvent({
    title: event.title,
    date: event.date,
    venue: event.venue,
    category: event.category,
    fee: event.fee,
    seats: event.seats,
    description: event.description,
  });
}}
                  >
                    ✏️ Edit
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() => deleteEvent(event.id)}
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))

        ) : (

          <h2>No Events Found</h2>

        )}

      </div>

    </div>
  );
}

export default ManageEvents;