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

  // ==========================================
  // EVENTS
  // ==========================================

  const [events, setEvents] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("events")) || []
    );
  });

  // ==========================================
  // PARTICIPANTS
  // ==========================================

  const [participants, setParticipants] =
    useState([]);

  // ==========================================
  // FETCH PARTICIPANTS FROM MONGODB
  // ==========================================

  const fetchParticipants = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/participants`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch participants"
        );
      }

      setParticipants(
        data.participants || []
      );

    } catch (error) {
      console.error(
        "Fetch Participants Error:",
        error
      );
    }
  };

  // ==========================================
  // LOAD PARTICIPANTS
  // ==========================================

  useEffect(() => {
    fetchParticipants();
  }, []);

  // ==========================================
  // REFRESH DATA
  // ==========================================

  const refreshData = async () => {

    await fetchParticipants();

    setEvents(
      JSON.parse(
        localStorage.getItem("events")
      ) || []
    );
  };

  // ==========================================
  // ADD PARTICIPANT
  // ==========================================

  const addParticipant = async (
    participant
  ) => {

    try {

      const response = await fetch(
        `${API_URL}/api/participants`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            participant
          ),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to add participant"
        );
      }

      setParticipants((prev) => [
        data.participant,
        ...prev,
      ]);

      return data.participant;

    } catch (error) {

      console.error(
        "Add Participant Error:",
        error
      );

      throw error;
    }
  };

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
        addParticipant,
        fetchParticipants,
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