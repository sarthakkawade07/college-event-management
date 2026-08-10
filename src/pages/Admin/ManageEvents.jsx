import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "./ManageEvents.css";

const API_URL =
  "https://college-event-management-backend-2mzu.onrender.com/api/events";

// ==========================================
// GET ALL EVENTS
// ==========================================

const fetchEvents = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
};

function ManageEvents() {
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

  const queryClient = useQueryClient();

  // ==========================================
  // TANSTACK - GET EVENTS
  // ==========================================

  const {
    data: events = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  // ==========================================
  // DELETE EVENT
  // ==========================================

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete event");
      }

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });

      alert("✅ Event Deleted Successfully");
    },

    onError: (error) => {
      console.log("Delete Error:", error);
      alert(error.message || "Unable to delete event");
    },
  });

  // ==========================================
  // UPDATE EVENT
  // ==========================================

  const updateMutation = useMutation({
    mutationFn: async ({ id, eventData }) => {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update event");
      }

      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });

      setEditingId(null);

      alert("✅ Event Updated Successfully");
    },

    onError: (error) => {
      console.log("Update Error:", error);
      alert(error.message || "Unable to update event");
    },
  });

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredEvents = events.filter((event) =>
    event.title?.toLowerCase().includes(search.toLowerCase())
  );

  // ==========================================
  // DELETE
  // ==========================================

  const deleteEvent = (id) => {
    if (!window.confirm("Delete this event?")) {
      return;
    }

    deleteMutation.mutate(id);
  };

  // ==========================================
  // SAVE EDIT
  // ==========================================

  const saveEdit = (id) => {
    updateMutation.mutate({
      id,
      eventData: editedEvent,
    });
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Loading Events...
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (isError) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px",
          fontSize: "25px",
          color: "red",
        }}
      >
        Failed to load events.
        <br />
        {error.message}
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

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

          <div
            className="event-box"
            key={event._id}
          >

            {editingId === event._id ? (

              <>
                {/* ================= EDIT FORM ================= */}

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

                {/* ================= BUTTONS ================= */}

                <div className="btn-group">

                  <button
                    className="edit-btn"
                    onClick={() => saveEdit(event._id)}
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending
                      ? "Saving..."
                      : "💾 Save"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => setEditingId(null)}
                    disabled={updateMutation.isPending}
                  >
                    ❌ Cancel
                  </button>

                </div>
              </>

            ) : (

              <>
                {/* ================= EVENT DETAILS ================= */}

                <div className="event-details">

                  <h2>{event.title}</h2>

                  <p>
                    <strong>Description:</strong>{" "}
                    {event.description}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {event.date}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {event.time}
                  </p>

                  <p>
                    <strong>Venue:</strong>{" "}
                    {event.venue}
                  </p>

                  <p>
                    <strong>Category:</strong>{" "}
                    {event.category}
                  </p>

                  <p>
                    <strong>Organizer:</strong>{" "}
                    {event.organizer}
                  </p>

                  <p>
                    <strong>Fee:</strong>{" "}
                    {Number(event.fee) === 0
                      ? "Free"
                      : `₹${event.fee}`}
                  </p>

                </div>

                {/* ================= ACTION BUTTONS ================= */}

                <div className="btn-group">

                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingId(event._id);

                      setEditedEvent({
                        title: event.title || "",
                        description: event.description || "",
                        date: event.date || "",
                        time: event.time || "",
                        venue: event.venue || "",
                        category: event.category || "",
                        organizer: event.organizer || "",
                        fee: event.fee ?? "",
                        image: event.image || "",
                      });
                    }}
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteEvent(event._id)}
                    disabled={deleteMutation.isPending}
                  >
                    {deleteMutation.isPending
                      ? "Deleting..."
                      : "🗑 Delete"}
                  </button>

                </div>
              </>

            )}

          </div>

        ))}

        {filteredEvents.length === 0 && (
          <h2
            style={{
              textAlign: "center",
              width: "100%",
            }}
          >
            No Events Found
          </h2>
        )}

      </div>

    </div>
  );
}

export default ManageEvents;