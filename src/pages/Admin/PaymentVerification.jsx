import { useEffect, useState } from "react";
import "./PaymentVerification.css";

function PaymentVerification() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("paymentVerification")) || [];

    setPayments(data);
  }, []);

  const updateStatus = (id, status) => {
    const updatedPayments = payments.map((item) =>
      item.id === id
        ? { ...item, status }
        : item
    );

    setPayments(updatedPayments);

    localStorage.setItem(
      "paymentVerification",
      JSON.stringify(updatedPayments)
    );

    // Update My Events
    const myEvents =
      JSON.parse(localStorage.getItem("myEvents")) || [];

    const payment = updatedPayments.find(
      (item) => item.id === id
    );

    const updatedMyEvents = myEvents.map((event) =>
      event.transactionId === payment.transactionId
        ? {
            ...event,
            paymentStatus: status,
          }
        : event
    );

    localStorage.setItem(
      "myEvents",
      JSON.stringify(updatedMyEvents)
    );

    alert(`Payment ${status} Successfully`);
  };

  const filtered = payments.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="payment-verification">

      <h1>💳 Payment Verification</h1>

      <input
        type="text"
        placeholder="Search Student..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="payment-grid">

        {filtered.length === 0 ? (

          <h2>No Payments Found</h2>

        ) : (

          filtered.map((item) => (

            <div className="payment-card" key={item.id}>

              <h2>{item.name}</h2>

              <p><strong>Email :</strong> {item.email}</p>

              <p><strong>Event :</strong> {item.eventTitle}</p>

              <p><strong>Amount :</strong> ₹{item.amount}</p>

              <p>
                <strong>Transaction ID :</strong>
                <br />
                {item.transactionId}
              </p>

              <p>
                <strong>Status :</strong>{" "}
                <span className={`status ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </p>

              {item.status === "Pending" && (

                <div className="buttons">

                  <button
                    className="approve"
                    onClick={() =>
                      updateStatus(item.id, "Approved")
                    }
                  >
                    ✅ Approve
                  </button>

                  <button
                    className="reject"
                    onClick={() =>
                      updateStatus(item.id, "Rejected")
                    }
                  >
                    ❌ Reject
                  </button>

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