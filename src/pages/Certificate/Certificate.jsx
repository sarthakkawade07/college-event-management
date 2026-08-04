import "./Certificate.css";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

import { FaAward } from "react-icons/fa";

function Certificate() {
  const { state } = useLocation();

  if (!state) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Certificate Not Found
      </h2>
    );
  }

  const { name, eventTitle, date } = state;

  const certificateId =
    "CERT-" + Math.floor(Math.random() * 999999);

  const issueDate = new Date().toLocaleDateString("en-IN");

  const downloadPDF = () => {
    const doc = new jsPDF("landscape");

    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(4);
    doc.rect(10, 10, 277, 190);

    doc.setDrawColor(251, 191, 36);
    doc.setLineWidth(1);
    doc.rect(15, 15, 267, 180);

    doc.setFontSize(26);
    doc.setTextColor(37, 99, 235);
    doc.text("CERTIFICATE OF PARTICIPATION", 148, 35, {
      align: "center",
    });

    doc.setFontSize(15);
    doc.setTextColor(100);
    doc.text(
      "College Event Management System",
      148,
      48,
      {
        align: "center",
      }
    );

    doc.setFontSize(16);
    doc.text(
      "This Certificate is Proudly Presented To",
      148,
      70,
      {
        align: "center",
      }
    );

    doc.setFontSize(28);
    doc.setTextColor(0);
    doc.text(name, 148, 90, {
      align: "center",
    });

    doc.setFontSize(17);
    doc.text(
      "For Successfully Participating In",
      148,
      108,
      {
        align: "center",
      }
    );

    doc.setTextColor(37, 99, 235);
    doc.setFontSize(22);
    doc.text(eventTitle, 148, 123, {
      align: "center",
    });

    doc.setFontSize(13);
    doc.setTextColor(0);

    doc.text(`Event Date : ${date}`, 25, 160);

    doc.text(`Issue Date : ${issueDate}`, 25, 170);

    doc.text(
      `Certificate ID : ${certificateId}`,
      25,
      180
    );

    doc.text(
      "Event Coordinator",
      215,
      170
    );

    doc.text("Principal", 250, 170);

    doc.save(`${name}_Certificate.pdf`);
  };

  return (
    <div className="certificate-page">
      <div className="certificate">

        <div className="certificate-header">

           <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Graduation_cap.svg/512px-Graduation_cap.svg.png"
      alt="Logo"
      className="college-logo"
    />

          <h4>
            Vidya Pratishthan Polytechnic College,
            Indapur
          </h4>

          <p>
            College Event Management System
          </p>

        </div>

        <div className="award-icon">
          <FaAward />
        </div>

        <h1>
          Certificate of Participation
        </h1>

        <p>
          This Certificate is Proudly Presented To
        </p>

        <h2>{name}</h2>

        <p>
          For Successfully Participating In
        </p>

        <h3>{eventTitle}</h3>

        <div className="certificate-details">

          <p>
            <strong>📅 Event Date :</strong>
            <br />
            {date}
          </p>

          <p>
            <strong>🆔 Certificate ID :</strong>
            <br />
            {certificateId}
          </p>

          <p>
            <strong>📆 Issue Date :</strong>
            <br />
            {issueDate}
          </p>

        </div>

        <div className="signature-section">

          <div className="signature">
            <h3>______________</h3>
            <h4>Event Coordinator</h4>
          </div>

          <div className="signature">
            <h3>______________</h3>
            <h4>Principal</h4>
          </div>

        </div>

        <button
          className="download-btn"
          onClick={downloadPDF}
        >
          📄 Download Certificate
        </button>

      </div>
    </div>
  );
}

export default Certificate;