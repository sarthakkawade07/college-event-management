import { useEffect, useState } from "react";
import "./PaymentVerification.css";

function PaymentVerification() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://college-event-management-backend-2mzu.onrender.com/api/payments";

  // ==============================
  // Fetch Payments From MongoDB
  // ==============================

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch(API_URL);

      const data = await res.json();

      console.log("Payment Verification Data:", data);

      if (res.ok) {
        setPayments(data.payments || []);
      } else {
        alert(data.message || "Unable to fetch payments");
      }
    } catch (error) {
      console.log("Fetch Payments Error:", error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Update Payment Status
  // ==============================
const updateStatus = async (id, status) => {
  try {
    const res = await fetch(
      `https://college-event-management-backend-2mzu.onrender.com/api/payments/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    const data = await res.json();

    console.log("Payment Update Response:", data);

    if (!res.ok) {
      alert(data.message || "Payment update failed");
      return;
    }

    // Update payment list on screen
    const updatedPayments = payments.map((item) =>
      item._id === id
        ? {
            ...item,
            status,
          }
        : item
    );

    setPayments(updatedPayments);

    // Keep localStorage updated
    localStorage.setItem(
      "paymentVerification",
      JSON.stringify(updatedPayments)
    );

    alert(`Payment ${status} Successfully`);

  } catch (error) {
    console.log("Payment Update Error:", error);
    alert("Server Error. Please try again.");
  }
};

  // ==============================
  // Search
  // ==============================

  const filteredPayments = payments.filter((item) => {
    const studentName =
      item.name?.toLowerCase() || "";

    const email =
      item.email?.toLowerCase() || "";

    const eventTitle =
      item.eventTitle?.toLowerCase() || "";

    const transactionId =
      item.transactionId?.toLowerCase() || "";

    const searchText =
      search.toLowerCase();

    return (
      studentName.includes(searchText) ||
      email.includes(searchText) ||
      eventTitle.includes(searchText) ||
      transactionId.includes(searchText)
    );
  });

  // ==============================
  // Loading
  // ==============================

  if (loading) {
    return (
      <div className="payment-verification-page">
        <h2>Loading Payments...</h2>
      </div>
    );
  }

  // ==============================
  // UI
  // ==============================

  return (
    <div className="payment-verification-page">

      <h1>💳 Payment Verification</h1>

      <p className="verification-subtitle">
        Review and verify student payment submissions
      </p>

      {/* Search */}

      <input
        type="text"
        placeholder="Search Student, Email, Event or Transaction ID..."
        className="search-box"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* Payments */}

      <div className="payment-grid">

        {filteredPayments.length === 0 ? (

          <div className="no-payments">

            <h2>
              No Payments Found
            </h2>

            <p>
              No payment submissions are available.
            </p>

          </div>

        ) : (

          filteredPayments.map((item) => (

            <div
              className="payment-card"
              key={item._id}
            >

              {/* Header */}

              <div className="payment-card-header">

                <span className="payment-label">
                  PAYMENT
                </span>

                <span
                  className={`status ${
                    item.status?.toLowerCase() ||
                    "pending"
                  }`}
                >
                  {item.status || "Pending"}
                </span>

              </div>

              {/* Student */}

              <h2>
                👤 {item.name}
              </h2>

              <p>
                <strong>📧 Email :</strong>{" "}
                {item.email}
              </p>

              {/* Event */}

              <p>
                <strong>🎟 Event :</strong>{" "}
                {item.eventTitle}
              </p>

              {/* Amount */}

              <p>
                <strong>💰 Amount :</strong>{" "}
                {item.amount === 0
                  ? "Free"
                  : `₹${item.amount}`}
              </p>

              {/* Transaction */}

              <p>
                <strong>
                  🆔 Transaction ID :
                </strong>

                <br />

                <span className="transaction-id">
                  {item.transactionId}
                </span>
              </p>

              {/* Screenshot */}

              <div className="screenshot-section">

                <strong>
                  📸 Payment Screenshot
                </strong>

                {item.screenshot ? (

                  <p className="screenshot-name">
                    {item.screenshot}
                  </p>

                ) : (

                  <p>
                    Screenshot not uploaded
                  </p>

                )}

              </div>

              {/* Date */}

              {item.createdAt && (

                <p>
                  <strong>
                    📅 Submitted :
                  </strong>{" "}
                  {new Date(
                    item.createdAt
                  ).toLocaleString()}
                </p>

              )}

              {/* Buttons */}

              {item.status === "Pending" && (

                <div className="buttons">

                  <button
                    className="approve"
                    onClick={() =>
                      updateStatus(
                        item._id,
                        "Approved"
                      )
                    }
                  >
                    ✅ Approve
                  </button>

                  <button
                    className="reject"
                    onClick={() =>
                      updateStatus(
                        item._id,
                        "Rejected"
                      )
                    }
                  >
                    ❌ Reject
                  </button>

                </div>

              )}

              {item.status === "Approved" && (

                <div className="approved-message">
                  ✅ Payment Approved
                </div>

              )}

              {item.status === "Rejected" && (

                <div className="rejected-message">
                  ❌ Payment Rejected
                </div>

              )}

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default PaymentVerification;