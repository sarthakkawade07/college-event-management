import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section">
          <h2>Campus Event Hub</h2>
          <p>
            Discover, register and participate in exciting college events
            from one platform.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>Events</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>

          <p>Email: Kawadesarthak386@gmail.com</p>
          <p>Phone: +91 9175062537</p>
          <p>Location: Indapur, Pune</p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 Campus Event Hub | All Rights Reserved
      </p>

    </footer>
  );
}

export default Footer;