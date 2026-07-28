import { createContext, useContext, useState, useEffect } from "react";

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    setEvents(
      JSON.parse(localStorage.getItem("events")) || []
    );

    setParticipants(
      JSON.parse(localStorage.getItem("participants")) || []
    );
  }, []);

  const refreshData = () => {
    setEvents(
      JSON.parse(localStorage.getItem("events")) || []
    );

    setParticipants(
      JSON.parse(localStorage.getItem("participants")) || []
    );
  };
  const addParticipant = (participant) => {
  const updatedParticipants = [...participants, participant];

  localStorage.setItem(
    "participants",
    JSON.stringify(updatedParticipants)
  );

  setParticipants(updatedParticipants);
};

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

export function useEvent() {
  return useContext(EventContext);
}