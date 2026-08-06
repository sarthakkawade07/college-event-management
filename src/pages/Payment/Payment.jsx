import "./Payment.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    fetch(
      `https://college-event-management-backend-2mzu.onrender.com/api/events/${id}`
    )
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!event) {
    return <h2>Loading...</h2>;
  }

  const handlePayment = async () => {
    if (!transactionId.trim()) {
      alert("Please Enter Transaction ID");
      return;
    }

    const user =
      JSON.parse(localStorage.getItem("loggedInUser")) || {};

    const paymentData = {
      eventId: event._id,
      eventTitle: event.title,
      name: user.fullName,
      email: user.email,
      amount: event.fee,
      transactionId,
      status: "Pending",
    };

    try {
      const res = await fetch(
        "https://college-event-management-backend-2mzu.onrender.com/api/payments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Payment Submitted Successfully");
        navigate("/my-events");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-card">

        <h1>Payment Verification</h1>

        <img
          src="https://i.ibb.co/wrNNpyxc/scanner.png"
          alt="QR"
          className="qr-image"
        />

        <h2>{event.title}</h2>

        <p>
          Amount :
          <strong>
            {event.fee === 0 ? " Free" : ` ₹${event.fee}`}
          </strong>
        </p>

        <input
          type="text"
          placeholder="Enter Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="transaction-input"
        />

        <button onClick={handlePayment}>
          Submit Payment
        </button>

      </div>
    </div>
  );
}

export default Payment;