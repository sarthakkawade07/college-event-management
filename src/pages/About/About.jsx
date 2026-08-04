import "./About.css";
import sarthak from "../../assets/sarthak.jpg";
function About() {
  return (
    <div className="about-page">

      <section className="about-hero">
        <h1>About Campus Event Hub</h1>

        <p>
          Campus Event Hub is a modern platform that helps students discover,
          register and participate in college events with ease.
        </p>
      </section>

      <section className="about-content">

        <div className="about-card">
          <h2>🎯 Our Mission</h2>

          <p>
            Our mission is to simplify college event management by providing
            one platform for students and organizers.
          </p>
        </div>

        <div className="about-card">
          <h2>👁 Our Vision</h2>

          <p>
            To become the best digital platform for managing college events
            across universities.
          </p>
        </div>

        <div className="about-card">
          <h2>⭐ Why Choose Us?</h2>

          <ul>
            <li>Easy Event Registration</li>
            <li>Modern User Interface</li>
            <li>Fast & Secure</li>
            <li>Responsive Design</li>
            <li>Real-time Updates</li>
          </ul>
        </div>

      </section>

      <section className="about-stats">
        <section className="team-section">

  <h2>Meet Our Team</h2>

  <div className="team-container">

    <div className="team-card">
  <img src={sarthak} alt="Sarthak Kawade" />

  <h3>Sarthak Kawade</h3>

  <p>Frontend Developer</p>
</div>

    <div className="team-card">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy7m26Tgenls5TSQ3S1ZGiksLo5pb10V-r_1-jA50GKg&s"
        alt="Team Member"
      />
      <h3>Sandesh Deokate</h3>
      <p>Backend Developer</p>
    </div>

    <div className="team-card">
      <img
        src="https://assets.weforum.org/sf_account/image/SU7jY2MYK0Qaj6IgY6e0hXgO4LBYNB6qKxy9f-cr8KU.jpg"
        alt="Team Member"
      />
      <h3>Shambhuraje Ambole</h3>
      <p>UI / UX Designer</p>
    </div>

  </div>

</section>

        <div className="stat-box">
          <h2>500+</h2>
          <p>Students</p>
        </div>

        <div className="stat-box">
          <h2>100+</h2>
          <p>Events</p>
        </div>

        <div className="stat-box">
          <h2>50+</h2>
          <p>Organizers</p>
        </div>

        <div className="stat-box">
          <h2>25+</h2>
          <p>Departments</p>
        </div>

      </section>

    </div>
  );
}

export default About;