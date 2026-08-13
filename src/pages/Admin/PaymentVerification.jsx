import "./PaymentVerification.css";
import { useEffect, useState } from "react";

const API =
  "https://college-event-management-backend-2mzu.onrender.com/api";

function PaymentVerification() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // GET PAYMENTS FROM DATABASE
  // ==========================================

  const fetchPayments = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API}/payments`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch payments"
        );
      }

      setPayments(data.payments || []);
    } catch (error) {
      console.error(
        "Fetch Payments Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // ==========================================
  // UPDATE PAYMENT
  // ==========================================

  const updateStatus = async (id, status) => {
  try {
    const response = await fetch(
      `https://college-event-management-backend-2mzu.onrender.com/api/payments/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Payment update failed"
      );
    }

    // Update screen
    const updatedPayments = payments.map((item) =>
      item._id === id
        ? {
            ...item,
            status: status,
          }
        : item
    );

    setPayments(updatedPayments);

    alert(
      `Payment ${status} successfully!`
    );

  } catch (error) {
    console.log(
      "Payment Update Error:",
      error
    );

    alert(
      error.message ||
        "Something went wrong"
    );
  }
};

  if (loading) {
    return (
      <div className="payment-verification">
        <h2>Loading Payments...</h2>
      </div>
    );
  }

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

            <img
              src={item.screenshot}
              alt="Payment"
            />

            <div className="payment-info">

              <h2>
                {item.eventTitle}
              </h2>

              <p>
                <strong>
                  Name :
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
                {item.transactionId}
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
                {new Date(
                  item.createdAt
                ).toLocaleString()}
              </p>

              <div className="buttons">

                <button
  className="approve"
  onClick={() =>
    updateStatus(item._id, "Approved")
  }
>
  ✅ Approve
</button>
<button
  className="reject"
  onClick={() =>
    updateStatus(item._id, "Rejected")
  }
>
  ❌ Reject
</button>

              </div>

            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default PaymentVerification;