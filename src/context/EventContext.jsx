import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const EventContext = createContext();

const API_URL =
  "https://college-event-management-backend-2mzu.onrender.com";

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);

  // ==========================================
  // GET EVENTS FROM DATABASE
  // ==========================================

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/events`
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        setEvents(data.events || []);
      }

    } catch (error) {
      console.log(
        "Fetch Events Error:",
        error
      );
    }
  };

  // ==========================================
  // GET PARTICIPANTS FROM DATABASE
  // ==========================================

  const fetchParticipants = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/participants`
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setParticipants(data);
      } else {
        setParticipants(
          data.participants || []
        );
      }

    } catch (error) {
      console.log(
        "Fetch Participants Error:",
        error
      );
    }
  };

  // ==========================================
  // REFRESH DATABASE DATA
  // ==========================================

  const refreshData = async () => {
    await fetchEvents();
    await fetchParticipants();
  };

  // ==========================================
  // FIRST LOAD
  // ==========================================

  useEffect(() => {
    refreshData();
  }, []);

  // ==========================================
  // PROVIDER
  // ==========================================

  return (
    <EventContext.Provider
      value={{
        events,
        participants,
        setEvents,
        setParticipants,
        refreshData,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

// ==========================================
// CUSTOM HOOK
// ==========================================

export function useEvent() {
  return useContext(EventContext);
}