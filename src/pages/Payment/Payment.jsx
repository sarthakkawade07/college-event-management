import "./Payment.css";
import { useParams, useNavigate } from "react-router-dom";
import eventData from "../Home/eventData";

function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    const registeredEvents =
      JSON.parse(localStorage.getItem("myEvents")) || [];

    const alreadyRegistered = registeredEvents.find(
      (item) => item.id === event.id
    );

    if (!alreadyRegistered) {
      registeredEvents.push({
        id: event.id,
        title: event.title,
        date: event.date,
        status: "Registered",
      });

      localStorage.setItem(
        "myEvents",
        JSON.stringify(registeredEvents)
      );
    }

    alert("Payment Successful!");

    navigate("/my-events");
  };

  return (
    <div className="payment-page">
      <div className="payment-card">

        <h1>Payment</h1>

        <img
          src="https://i.ibb.co/wrNNpyxc/scanner.png"
          alt="QR Code"
          className="qr-image"
        />

        <h2>{event.title}</h2>

        <p>
          Amount :
          <strong>
            {event.fee === 0 ? " Free" : ` ₹${event.fee}`}
          </strong>
        </p>

        <p>
          Scan this QR using Google Pay / PhonePe / Paytm
        </p>

        <button onClick={handlePayment}>
          I Have Paid
        </button>

      </div>
    </div>
  );
}

export default Payment;