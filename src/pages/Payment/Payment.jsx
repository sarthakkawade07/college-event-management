import "./Payment.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaQrcode,
  FaCreditCard,
  FaArrowRight,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";

function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);

  const user =
    JSON.parse(localStorage.getItem("loggedInUser")) || {};

  useEffect(() => {
    fetch(
      `https://college-event-management-backend-2mzu.onrender.com/api/events/${id}`
    )
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!event) {
    return <h2 className="loading">Loading...</h2>;
  }

  const handlePayment = async () => {
    if (!transactionId.trim()) {
      alert("Please Enter Transaction ID");
      return;
    }

    const paymentData = {
      eventId: event._id,
      eventTitle: event.title,
      name: user.fullName || "",
      email: user.email || "",
      amount: event.fee,
      transactionId,
      screenshot: paymentScreenshot
        ? paymentScreenshot.name
        : "",
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
      <div className="payment-container">

        {/* LEFT PANEL */}
                <div className="payment-left">

          <span className="payment-badge">
            PAYMENT VERIFICATION
          </span>

          <h1>Complete Your Payment</h1>

          <p>
            Scan the QR code, complete your payment and
            submit the Transaction ID for verification.
          </p>

          <div className="payment-event-card">

            <h2>{event.title}</h2>

            <div className="payment-info">
              <FaCalendarAlt />
              <span>{event.date}</span>
            </div>

            <div className="payment-info">
              <FaMapMarkerAlt />
              <span>{event.venue}</span>
            </div>

            <div className="payment-info">
              <FaMoneyBillWave />
              <span>
                {event.fee === 0
                  ? "Free Entry"
                  : `₹${event.fee}`}
              </span>
            </div>

            <div className="payment-steps">

              <h3>Payment Steps</h3>

              <p>① Scan QR Code</p>
              <p>② Pay Registration Fee</p>
              <p>③ Copy Transaction ID</p>
              <p>④ Upload Payment Screenshot</p>
              <p>⑤ Submit For Verification</p>

            </div>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="payment-right">

          <div className="payment-header">

            <FaCreditCard className="payment-icon"/>

            <h2>Payment Details</h2>

            <p>
              Complete your payment and upload proof.
            </p>

          </div>

          <div className="student-card">

            <div className="student-item">
              <FaUser />
              <span>{user.fullName || "Student Name"}</span>
            </div>

            <div className="student-item">
              <FaEnvelope />
              <span>{user.email || "student@email.com"}</span>
            </div>

          </div>

          <div className="qr-card">

            <FaQrcode className="qr-icon"/>

            <img
              src="https://i.ibb.co/wrNNpyxc/scanner.png"
              alt="QR Code"
              className="qr-image"
            />

          </div>

          <div className="amount-card">

            <FaMoneyBillWave className="amount-icon"/>

            <div>

              <h4>Registration Fee</h4>

              <h2>
                {event.fee === 0
                  ? "FREE"
                  : `₹${event.fee}`}
              </h2>

            </div>

          </div>
                    <div className="input-box">

            <input
              type="text"
              placeholder="Enter Transaction ID"
              value={transactionId}
              onChange={(e) =>
                setTransactionId(e.target.value)
              }
            />

          </div>

          <div className="upload-box">

            <label>
              Upload Payment Screenshot
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setPaymentScreenshot(e.target.files[0])
              }
            />

            {paymentScreenshot && (

              <div className="preview-box">

                <img
                  src={URL.createObjectURL(paymentScreenshot)}
                  alt="Payment Preview"
                  className="preview-image"
                />

                <p>{paymentScreenshot.name}</p>

              </div>

            )}

          </div>

          <button
            className="payment-btn"
            onClick={handlePayment}
          >
            Submit Payment
            <FaArrowRight />
          </button>

        </div>

      </div>

    </div>
  );
}

export default Payment;