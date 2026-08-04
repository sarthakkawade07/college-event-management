import "./PaymentVerification.css";
import { useState } from "react";

function PaymentVerification() {

  const [payments, setPayments] = useState(
    JSON.parse(localStorage.getItem("payments")) || []
  );

  const updateStatus = (id, status) => {

    const updated = payments.map((item) =>
      item.id === id ? { ...item, status } : item
    );

    setPayments(updated);

    localStorage.setItem(
      "payments",
      JSON.stringify(updated)
    );

  };

  return (

    <div className="payment-verification">

      <h1>💳 Payment Verification</h1>

      {

        payments.length===0 ?

        <h2>No Payment Requests</h2>

        :

        payments.map((item)=>(

          <div
            className="payment-card"
            key={item.id}
          >

            <img
              src={item.screenshot}
              alt=""
            />

            <div className="payment-info">

              <h2>{item.eventTitle}</h2>

              <p>

                <strong>Amount :</strong>

                ₹{item.amount}

              </p>

              <p>

                <strong>Transaction ID :</strong>

                {item.transactionId || "N/A"}

              </p>

              <p>

                <strong>Status :</strong>

                {item.status}

              </p>

              <p>

                <strong>Date :</strong>

                {item.uploadedAt}

              </p>

              <div className="buttons">

                <button
                  className="approve"
                  onClick={()=>
                    updateStatus(item.id,"Approved")
                  }
                >

                  ✅ Approve

                </button>

                <button
                  className="reject"
                  onClick={()=>
                    updateStatus(item.id,"Rejected")
                  }
                >

                  ❌ Reject

                </button>

              </div>

            </div>

          </div>

        ))

      }

    </div>

  );

}

export default PaymentVerification;