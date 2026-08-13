import "./PaymentVerification.css";
import { useEffect, useState } from "react";
import { useEvent } from "../../context/EventContext";

const API_URL =
  "https://college-event-management-backend-2mzu.onrender.com/api";

function PaymentVerification() {
  const { fetchParticipants } = useEvent();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // GET PAYMENTS FROM MONGODB
  // ==========================================

  const fetchPayments = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/payments`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch payments"
        );
      }

      setPayments(data.payments || []);

    } catch (error) {
      console.error(
        "Fetch Payments Error:",
        error
      );

      alert(
        error.message ||
          "Failed to load payment requests"
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD PAYMENTS WHEN PAGE OPENS
  // ==========================================

  useEffect(() => {
    fetchPayments();
  }, []);

  // ==========================================
  // UPDATE PAYMENT STATUS
  // ==========================================

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `${API_URL}/payments/${id}`,
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Payment update failed"
        );
      }

      // ========================================
      // UPDATE PAYMENT IN UI
      // ========================================

      setPayments((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                status,
              }
            : item
        )
      );

      // ========================================
      // REFRESH PARTICIPANTS FROM MONGODB
      // ========================================

      if (fetchParticipants) {
        await fetchParticipants();
      }

      alert(
        `Payment ${status} successfully!`
      );

    } catch (error) {
      console.error(
        "Payment Status Error:",
        error
      );

      alert(
        error.message ||
          "Failed to update payment"
      );
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="payment-verification">
        <h1>
          💳 Payment Verification
        </h1>

        <h2>
          Loading payment requests...
        </h2>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="payment-verification">

      <h1>
        💳 Payment Verification
      </h1>

      {payments.length === 0 ? (

        <h2>
          No Payment Requests
        </h2>

      ) : (

        payments.map((item) => (

          <div
            className="payment-card"
            key={item._id}
          >

            {/* PAYMENT SCREENSHOT */}

            <img
              src={item.screenshot}
              alt="Payment Screenshot"
            />

            {/* PAYMENT INFORMATION */}

            <div className="payment-info">

              <h2>
                {item.eventTitle}
              </h2>

              <p>
                <strong>
                  Student :
                </strong>{" "}
                {item.name}
              </p>

              <p>
                <strong>
                  Email :
                </strong>{" "}
                {item.email}
              </p>

              <p>
                <strong>
                  Amount :
                </strong>{" "}
                ₹{item.amount}
              </p>

              <p>
                <strong>
                  Transaction ID :
                </strong>{" "}
                {item.transactionId || "N/A"}
              </p>

              <p>
                <strong>
                  Status :
                </strong>{" "}
                {item.status}
              </p>

              <p>
                <strong>
                  Date :
                </strong>{" "}
                {item.createdAt
                  ? new Date(
                      item.createdAt
                    ).toLocaleString("en-IN")
                  : "N/A"}
              </p>

              {/* BUTTONS */}

              <div className="buttons">

                {item.status !==
                  "Approved" && (

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

                )}

                {item.status !==
                  "Rejected" && (

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

                )}

              </div>

            </div>

          </div>

        ))

      )}

    </div>
  );
}

export default PaymentVerification;