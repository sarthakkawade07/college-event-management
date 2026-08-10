import "./Participants.css";
import { useQuery } from "@tanstack/react-query";

function Participants() {
  // ==========================================
  // TANSTACK QUERY - GET PARTICIPANTS
  // ==========================================

  const {
    data: participants = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["participants"],

    queryFn: async () => {
      const response = await fetch(
        "https://college-event-management-backend-2mzu.onrender.com/api/participants"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch participants");
      }

      const data = await response.json();

      console.log("Participants Data:", data);

      return data.participants || [];
    },

    staleTime: 5 * 60 * 1000,
  });

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <div className="loading">
        Loading Participants...
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (isError) {
    return (
      <div className="loading">
        Failed to load participants.
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="participants-page">

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