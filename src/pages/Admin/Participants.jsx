import { useEffect, useState } from "react";
import "./Participants.css";

function Participants() {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://college-event-management-backend-2mzu.onrender.com/api/participants"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Participants Data:", data);

        setParticipants(data.participants || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Participants Fetch Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading Participants...</h2>;
  }

  return (
    <div className="participants-container">

      <h1>Participants List</h1>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Event</th>
            <th>Email</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Payment</th>
          </tr>
        </thead>

        <tbody>

          {participants.length > 0 ? (

            participants.map((item) => (
              <tr key={item._id}>

                <td>
                  {item.participantName}
                </td>

                <td>
                  {item.eventTitle}
                </td>

                <td>
                  {item.email}
                </td>

                <td>
                  {item.transactionId}
                </td>

                <td>
                  ₹{item.amount}
                </td>

                <td>
                  {item.paymentStatus}
                </td>

              </tr>
            ))

          ) : (

            <tr>
              <td colSpan="6">
                No Participants Yet
              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Participants;