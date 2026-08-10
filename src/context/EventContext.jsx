import { createContext, useContext, useState } from "react";

const EventContext = createContext();

export function EventProvider({ children }) {

  // ==========================================
  // GET DATA FROM LOCAL STORAGE
  // ==========================================

  const [events, setEvents] = useState(() => {
    return JSON.parse(localStorage.getItem("events")) || [];
  });

  const [participants, setParticipants] = useState(() => {
    return JSON.parse(localStorage.getItem("participants")) || [];
  });

  // ==========================================
  // REFRESH DATA
  // ==========================================

  const refreshData = () => {
    setEvents(
      JSON.parse(localStorage.getItem("events")) || []
    );

    setParticipants(
      JSON.parse(localStorage.getItem("participants")) || []
    );
  };

  // ==========================================
  // ADD PARTICIPANT
  // ==========================================

  const addParticipant = (participant) => {
    const updatedParticipants = [
      ...participants,
      participant,
    ];

    localStorage.setItem(
      "participants",
      JSON.stringify(updatedParticipants)
    );

    setParticipants(updatedParticipants);
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