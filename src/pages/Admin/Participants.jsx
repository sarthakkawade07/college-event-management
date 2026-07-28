import { useEffect, useState } from "react";
import "./Participants.css";

function Participants() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("participants")) || [];

    setParticipants(data);
  }, []);

  return (
    <div className="participants-page">

      <h1>Participants List</h1>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Event</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Department</th>
            <th>Year</th>
          </tr>
        </thead>

        <tbody>

          {participants.length > 0 ? (

            participants.map((item, index) => (
              <tr key={index}>
                <td>{item.fullName}</td>
                <td>{item.eventTitle}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>{item.department}</td>
                <td>{item.year}</td>
              </tr>
            ))

          ) : (

            <tr>
              <td colSpan="6">No Participants Yet</td>
            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Participants;