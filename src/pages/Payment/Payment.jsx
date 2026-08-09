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

  // Registration page वर save केलेली माहिती
  const registrationData =
    JSON.parse(localStorage.getItem("registrationData")) || {};

  useEffect(() => {
    fetch(
      `https://college-event-management-backend-2mzu.onrender.com/api/events/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
      })
      .catch((err) => {
        console.log("Event Fetch Error:", err);
      });
  }, [id]);

  // Loading
  if (!event) {
    return <h2 className="loading">Loading...</h2>;
  }

  // Submit Payment
  const handlePayment = async () => {
    if (!registrationData.fullName) {
      alert("Student name not found. Please register again.");
      return;
    }

    if (!registrationData.email) {
      alert("Student email not found. Please register again.");
      return;
    }

    if (!transactionId.trim()) {
      alert("Please Enter Transaction ID");
      return;
    }

    if (!paymentScreenshot) {
      alert("Please Upload Payment Screenshot");
      return;
    }

    const paymentData = {
      eventId: event._id,
      eventTitle: event.title,
      name: registrationData.fullName,
      email: registrationData.email,
      amount: event.fee,
      transactionId: transactionId.trim(),
      screenshot: paymentScreenshot.name,
      status: "Pending",
    };

    console.log("Payment Data:", paymentData);

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

      console.log("Payment Response:", data);

      if (res.ok) {
        alert("Payment Submitted Successfully! 🎉");

        // Payment successful झाल्यावर registration data ठेवतो
        // पुढे My Events मध्ये वापरता येईल
        navigate("/my-events");
      } else {
        alert(
          data.message || "Payment submission failed"
        );
      }
    } catch (error) {
      console.log("Payment Error:", error);
      alert("Server Error. Please try again.");
    }
  };

  return (
    <div className="payment-page">

      <div className="payment-container">

        {/* ================= LEFT PANEL ================= */}

        <div className="payment-left">

          <span className="payment-badge">
            PAYMENT VERIFICATION
          </span>

          <h1>Complete Your Payment</h1>

          <p>
            Scan the QR code, complete your payment and
            submit the Transaction ID for verification.
          </p>

          {/* Event Card */}

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

            {/* Payment Steps */}

            <div className="payment-steps">

              <h3>How To Pay?</h3>

              <p>① Scan QR Code</p>

              <p>② Complete Payment</p>

              <p>③ Enter Transaction ID</p>

              <p>④ Upload Payment Screenshot</p>

              <p>⑤ Wait For Admin Verification</p>

            </div>

          </div>

        </div>


        {/* ================= RIGHT PANEL ================= */}

        <div className="payment-right">

          {/* Header */}

          <div className="payment-header">

            <FaCreditCard className="payment-icon" />

            <h2>Payment</h2>

            <p>
              Verify your payment below.
            </p>

          </div>


          {/* Student Details */}

          <div className="student-card">

            <div className="student-item">

              <FaUser />

              <span>
                {registrationData.fullName ||
                  "Student Name"}
              </span>

            </div>


            <div className="student-item">

              <FaEnvelope />

              <span>
                {registrationData.email ||
                  "student@email.com"}
              </span>

            </div>

          </div>


          {/* QR CARD */}

          <div className="qr-card">

            <FaQrcode className="qr-icon" />

            <img
              src="https://i.ibb.co/wrNNpyxc/scanner.png"
              alt="Payment QR Code"
              className="qr-image"
            />

            <h3>
              Amount :

              <span>
                {event.fee === 0
                  ? " Free"
                  : ` ₹${event.fee}`}
              </span>
            </h3>

          </div>


          {/* Amount Card */}

          <div className="amount-card">

            <FaMoneyBillWave className="amount-icon" />

            <div>

              <h4>Registration Fee</h4>

              <h2>
                {event.fee === 0
                  ? "FREE"
                  : `₹${event.fee}`}
              </h2>

            </div>

          </div>


          {/* Transaction ID */}

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


          {/* Screenshot Upload */}

          <div className="upload-box">

            <label>
              Upload Payment Screenshot
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setPaymentScreenshot(file);
                }
              }}
            />


            {/* Screenshot Preview */}

            {paymentScreenshot && (
              <div className="preview-box">

                <img
                  src={URL.createObjectURL(
                    paymentScreenshot
                  )}
                  alt="Payment Preview"
                  className="preview-image"
                />

                <p>
                  {paymentScreenshot.name}
                </p>

              </div>
            )}

          </div>


          {/* Submit Button */}

          <button
            type="button"
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