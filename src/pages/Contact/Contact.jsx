import "./Contact.css";
import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaClock,
} from "react-icons/fa";

function Contact() 
{
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e) => {
  e.preventDefault();

  if (
    formData.name === "" ||
    formData.email === "" ||
    formData.subject === "" ||
    formData.message === ""
  ) {
    alert("Please fill all fields.");
    return;
  }

  alert("✅ Message Sent Successfully!");

  setFormData({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
};

  return (
    <div className="contact-page">

      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Get in touch with us for any queries,
          suggestions, or support.
        </p>
        <p className="contact-tagline">
  "Your feedback helps us create a better event experience for everyone."
</p>
      </div>

      <div className="contact-container">

        {/* Contact Information */}
        <div className="contact-info">

          <h2>Get In Touch</h2>

          <div className="info-box">
            <FaMapMarkerAlt className="icon" />
            <div>
              <h4>Address</h4>
              <p>Vidya Pratishthan Polytechnic, Indapur, Pune</p>
            </div>
          </div>

          <div className="info-box">
            <FaPhoneAlt className="icon" />
            <div>
              <h4>Phone</h4>
              <p>+91 9175062537</p>
            </div>
          </div>

          <div className="info-box">
            <FaEnvelope className="icon" />
            <div>
              <h4>Email</h4>
              <p>kawadesarthak386@gmail.com</p>
            </div>
          </div>

          <div className="info-box">
            <FaGlobe className="icon" />
            <div>
              <h4>Website</h4>
              <p>www.campuseventhub.com</p>
            </div>
          </div>

          <div className="office-hours">
            <FaClock className="icon" />
            <div>
              <h4>Office Hours</h4>
              <p>Mon - Fri : 9:00 AM - 5:00 PM</p>
              <p>Sat : 9:00 AM - 1:00 PM</p>
              <p>Sunday : Closed</p>
            </div>
          </div>

          <div className="social-icons">
            <FaFacebook />
            <FaInstagram />
            <FaLinkedin />
            <FaGithub />
          </div>
          <div className="quick-buttons">
  <a href="tel:+919876543210">📞 Call Now</a>

  <a href="mailto:campuseventhub@gmail.com">
    📧 Email Us
  </a>
</div>

        </div>

        {/* Contact Form */}
        <div className="contact-form">

          <h2>Send Message</h2>

          <form onSubmit={handleSubmit}>

            <input
  type="text"
  name="name"
  placeholder="Enter Full Name"
  value={formData.name}
  onChange={handleChange}
/>
<input
  type="email"
  name="email"
  placeholder="Enter Email"
  value={formData.email}
  onChange={handleChange}
/>
  <input
  type="text"
  name="subject"
  placeholder="Subject"
  value={formData.subject}
  onChange={handleChange}
/>
<textarea
  rows="6"
  name="message"
  placeholder="Write your message..."
  value={formData.message}
  onChange={handleChange}
></textarea>

            <button type="submit">
              Send Message
            </button>

          </form>
          <p className="contact-note">
  We usually respond within <strong>24 hours</strong>.
  Thank you for contacting Campus Event Hub.
</p>

        </div>

      </div>
       {/* Google Map Section */}

<div className="map-section">

  <h2>Our Location</h2>

  <iframe
    title="College Location"
    src="https://www.google.com/maps?q=Vidya+Pratishthan+Polytechnic+Indapur&output=embed"
    width="100%"
    height="400"
    style={{ border: 0, borderRadius: "15px" }}
    allowFullScreen=""
    loading="lazy"
  ></iframe>

</div>
    </div>
  );
}

export default Contact;