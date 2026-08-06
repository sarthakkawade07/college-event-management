import { useEffect, useState } from "react";
import "./ManageEvents.css";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [editedEvent, setEditedEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    category: "",
    organizer: "",
    fee: "",
    image: "",
  });

  useEffect(() => {
    fetch("https://college-event-management-backend-2mzu.onrender.com/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await fetch(`https://college-event-management-backend-2mzu.onrender.com/api/events/${id}`, {
        method: "DELETE",
      });

      setEvents(events.filter((event) => event._id !== id));

      alert("✅ Event Deleted Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const saveEdit = async (id) => {
  try {
    const response = await fetch(`https://college-event-management-backend-2mzu.onrender.com/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedEvent),
      }
    );

    const result = await response.json();

    if (response.ok) {

      // Update UI immediately
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === id
            ? { ...event, ...editedEvent }
            : event
        )
      );

      setEditingId(null);

      alert("✅ Event Updated Successfully");

    } else {
      alert(result.message);
    }

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="manage-events-page">

      <h1>Manage Events</h1>

      <input
        className="search-input"
        type="text"
        placeholder="Search Event..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="events-list">

        {filteredEvents.map((event) => (
          <div className="event-box" key={event._id}>

  <h2>{event.title}</h2>

  <p>📅 {event.date}</p>
  <p>🕒 {event.time}</p>
  <p>📍 {event.venue}</p>
  <p>🏷 {event.category}</p>
  <p>👤 {event.organizer}</p>
  <p>💰 ₹{event.fee}</p>

  {editingId === event._id ? (

    <>
      <div className="edit-form">

        <input
          type="text"
          placeholder="Title"
          value={editedEvent.title}
          onChange={(e) =>
            setEditedEvent({
              ...editedEvent,
              title: e.target.value,
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
          type="time"
          value={editedEvent.time}
          onChange={(e) =>
            setEditedEvent({
              ...editedEvent,
              time: e.target.value,
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
          type="text"
          placeholder="Organizer"
          value={editedEvent.organizer}
          onChange={(e) =>
            setEditedEvent({
              ...editedEvent,
              organizer: e.target.value,
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
          type="text"
          placeholder="Image URL"
          value={editedEvent.image}
          onChange={(e) =>
            setEditedEvent({
              ...editedEvent,
              image: e.target.value,
            })
          }
        />

      </div>

      <div className="btn-group">

        <button
          className="edit-btn"
          onClick={() => saveEdit(event._id)}
        >
          💾 Save
        </button>

        <button
          className="delete-btn"
          onClick={() => setEditingId(null)}
        >
          ❌ Cancel
        </button>

      </div>

    </>
  ) : (
                  <>
                <div className="btn-group">

                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingId(event._id);

                      setEditedEvent({
                        title: event.title,
                        description: event.description,
                        date: event.date,
                        time: event.time,
                        venue: event.venue,
                        category: event.category,
                        organizer: event.organizer,
                        fee: event.fee,
                        image: event.image,
                      });
                    }}
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteEvent(event._id)}
                  >
                    🗑 Delete
                  </button>

                </div>
              </>
            )}

          </div>

        ))}

        {filteredEvents.length === 0 && (
          <h2 style={{ textAlign: "center", width: "100%" }}>
            No Events Found
          </h2>
        )}

      </div>

    </div>
  );
}

export default ManageEvents;