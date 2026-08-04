import "./Payment.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import eventData from "../Home/eventData";

function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [transactionId, setTransactionId] = useState("");

  const adminEvents =
    JSON.parse(localStorage.getItem("events")) || [];

  const allEvents = [...eventData, ...adminEvents];

  const event = allEvents.find(
    (item) => item.id === Number(id)
  );

  if (!event) {
    return <h2>Event Not Found</h2>;
  }

  const handlePayment = () => {

    if (transactionId.trim() === "") {
      alert("Please Enter Transaction ID");
      return;
    }

    const registeredEvents =
      JSON.parse(localStorage.getItem("myEvents")) || [];

    const paymentVerification =
      JSON.parse(localStorage.getItem("paymentVerification")) || [];

    const alreadyRegistered = registeredEvents.find(
      (item) => item.id === event.id
    );

    if (!alreadyRegistered) {

      registeredEvents.push({
        id: event.id,
        title: event.title,
        date: event.date,
        amount: event.fee,
        transactionId,
        paymentStatus: "Pending",
        status: "Registered",
      });

      localStorage.setItem(
        "myEvents",
        JSON.stringify(registeredEvents)
      );
    }

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const alreadySubmitted = paymentVerification.find(
  (item) =>
    item.email === (user?.email || "") &&
    item.eventTitle === event.title
);

if (alreadySubmitted) {
  alert("Payment already submitted for this event.");
  return;
}

    paymentVerification.push({
      id: Date.now(),
      name: user?.name || "Student",
      email: user?.email || "",
      eventTitle: event.title,
      amount: event.fee,
      transactionId,
      status: "Pending",
    });

    localStorage.setItem(
      "paymentVerification",
      JSON.stringify(paymentVerification)
    );

    alert(
      "Payment Submitted Successfully.\nWaiting For Admin Verification."
    );

    navigate("/my-events");
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
            {event.fee === 0
              ? " Free"
              : ` ₹${event.fee}`}
          </strong>
        </p>

        <p>
          Scan QR Code & Complete Payment
        </p>

        <input
          type="text"
          placeholder="Enter Transaction ID"
          value={transactionId}
          onChange={(e) =>
            setTransactionId(e.target.value)
          }
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