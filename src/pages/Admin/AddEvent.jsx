import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddEvent.css";

function AddEvent() {

  const navigate = useNavigate();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    venue: "",
    organizer: "",
    fee: "",
    image: "",
  });


  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:5000/api/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        }
      );


      const data = await response.json();


      if (response.ok) {

        alert("✅ Event Added Successfully!");

        setEvent({
          title: "",
          description: "",
          category: "",
          date: "",
          time: "",
          venue: "",
          organizer: "",
          fee: "",
          image: "",
        });


        navigate("/manage-events");

      } else {

        alert(data.message);

      }


    } catch (error) {

      console.log(error);
      alert("Server Error");

    }

  };


  return (

    <div className="add-event-page">

      <form 
        className="add-event-card" 
        onSubmit={handleSubmit}
      >

        <h2>Add New Event</h2>


        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={event.title}
          onChange={handleChange}
          required
        />


        <textarea
          name="description"
          placeholder="Description"
          value={event.description}
          onChange={handleChange}
          required
        />


        <input
          type="text"
          name="category"
          placeholder="Category"
          value={event.category}
          onChange={handleChange}
          required
        />


        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          required
        />


        <input
          type="time"
          name="time"
          value={event.time}
          onChange={handleChange}
          required
        />


        <input
          type="text"
          name="venue"
          placeholder="Venue"
          value={event.venue}
          onChange={handleChange}
          required
        />


        <input
          type="text"
          name="organizer"
          placeholder="Organizer"
          value={event.organizer}
          onChange={handleChange}
          required
        />


        <input
          type="number"
          name="fee"
          placeholder="Registration Fee"
          value={event.fee}
          onChange={handleChange}
          required
        />


        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={event.image}
          onChange={handleChange}
          required
        />


        <button type="submit">
          Publish Event
        </button>


      </form>

    </div>

  );

}

export default AddEvent;