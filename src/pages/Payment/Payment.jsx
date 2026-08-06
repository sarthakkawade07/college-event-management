import "./Payment.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Payment() {
  const navigate = useNavigate();

  const [transactionId, setTransactionId] = useState("");

  const registrationData = JSON.parse(
    localStorage.getItem("registrationData")
  );

  if (!registrationData) {
    return <h2>Registration Data Not Found</h2>;
  }

  const handlePayment = async () => {
    if (transactionId.trim() === "") {
      alert("Please Enter Transaction ID");
      return;
    }

    try {
      const response = await fetch(
        "https://college-event-management-backend-2mzu.onrender.com/api/registrations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...registrationData,
            transactionId,
            paymentStatus: "Pending",
            registrationStatus: "Registered",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("registrationData");

        alert("✅ Registration Successful!\nWaiting for Admin Verification.");

        navigate("/my-events");
      } else {
        alert(data.message || "Registration Failed");
      }
    } catch (error) {
      console.log(error);
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

        <h2>{registrationData.eventTitle}</h2>

        <p>
          Amount :
          <strong>
            {registrationData.amount === 0
              ? " Free"
              : ` ₹${registrationData.amount}`}
          </strong>
        </p>

        <p>Scan QR Code & Complete Payment</p>

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