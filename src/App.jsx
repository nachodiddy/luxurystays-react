import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";

const rooms = [
  {
    id: 1,
    name: "Deluxe Room",
    price: 85000,
    description: "A beautiful room with a king-size bed and modern facilities.",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900",
  },
  {
    id: 2,
    name: "Executive Suite",
    price: 145000,
    description:
      "Experience luxury with a spacious bedroom and private lounge.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900",
  },
  {
    id: 3,
    name: "Presidential Suite",
    price: 250000,
    description: "Our finest accommodation with premium comfort and elegance.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900",
  },
];

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        LuxuryStay<span>.</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <Link to="/booking" className="nav-button">
        Book Now
      </Link>
    </nav>
  );
}

function Footer() {
  return (
    <footer>
      <h2>
        LuxuryStay<span>.</span>
      </h2>
      <p>Experience comfort. Experience luxury.</p>
      <p>© 2026 LuxuryStay Hotel. All rights reserved.</p>
    </footer>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">WELCOME TO LUXURYSTAY</p>
          <h1>Experience Luxury Like Never Before</h1>
          <p>
            Discover exceptional hospitality, beautiful rooms and unforgettable
            experiences.
          </p>
          <Link to="/rooms" className="primary-btn">
            Explore Our Rooms
          </Link>
        </div>
      </section>

      <section className="welcome section">
        <div>
          <p className="eyebrow">YOUR COMFORT IS OUR PRIORITY</p>
          <h2>Welcome to LuxuryStay Hotel</h2>
          <p>
            At LuxuryStay, we believe every guest deserves an unforgettable
            experience. Our hotel combines modern luxury, exceptional
            hospitality and peaceful surroundings to create the perfect
            destination.
          </p>
          <Link to="/about" className="text-link">
            Discover Our Story →
          </Link>
        </div>

        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000"
          alt="Luxury hotel swimming pool"
        />
      </section>

      <section className="section featured">
        <div className="section-heading">
          <p className="eyebrow">ACCOMMODATION</p>
          <h2>Our Popular Rooms</h2>
        </div>

        <div className="room-grid">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>Ready for an Unforgettable Stay?</h2>
        <p>Book your perfect room today and experience true luxury.</p>
        <Link to="/booking" className="primary-btn">
          Reserve Your Room
        </Link>
      </section>
    </>
  );
}

function About() {
  return (
    <section className="section about-page">
      <p className="eyebrow">ABOUT US</p>
      <h1>Hospitality Beyond Expectations</h1>

      <img
        className="about-image"
        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200"
        alt="Luxury hotel exterior"
      />

      <h2>Our Story</h2>
      <p>
        LuxuryStay Hotel was established with a simple vision: to provide guests
        with a comfortable, luxurious and memorable hospitality experience.
      </p>

      <p>
        Through excellent customer service, modern facilities and attention to
        detail, we aim to make every visit special.
      </p>

      <div className="values-grid">
        <div>
          <h3>Our Mission</h3>
          <p>
            To provide exceptional accommodation and hospitality through
            comfort, quality and excellent customer service.
          </p>
        </div>

        <div>
          <h3>Our Vision</h3>
          <p>
            To become a leading hospitality destination known for luxury,
            innovation and guest satisfaction.
          </p>
        </div>
      </div>
    </section>
  );
}

function RoomCard({ room }) {
  return (
    <div className="room-card">
      <img src={room.image} alt={room.name} />

      <div className="room-info">
        <h3>{room.name}</h3>
        <p>{room.description}</p>

        <div className="room-bottom">
          <strong>
            ₦{room.price.toLocaleString()} <small>/ night</small>
          </strong>
          <Link to={`/booking?room=${room.id}`}>Book Now →</Link>
        </div>
      </div>
    </div>
  );
}

function Rooms() {
  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">COMFORT & ELEGANCE</p>
        <h1>Explore Our Rooms</h1>
        <p>Choose the perfect accommodation for your stay.</p>
      </div>

      <div className="room-grid">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
}

function Booking() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  const [form, setForm] = useState({
    name: "",
    email: "",
    room: params.get("room") || "1",
    checkin: "",
    checkout: "",
    guests: "1",
  });

  const [message, setMessage] = useState("");

  const selectedRoom = rooms.find((room) => room.id === Number(form.room));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email || !form.checkin || !form.checkout) {
      setMessage("Please complete all required fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (new Date(form.checkin) < new Date(new Date().toDateString())) {
      setMessage("Check-in date cannot be in the past.");
      return;
    }

    if (new Date(form.checkout) <= new Date(form.checkin)) {
      setMessage("Check-out must be after check-in.");
      return;
    }

    const booking = {
      ...form,
      roomName: selectedRoom.name,
      price: selectedRoom.price,
      bookingDate: new Date().toLocaleDateString(),
    };

    const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    localStorage.setItem(
      "bookings",
      JSON.stringify([...savedBookings, booking]),
    );

    setMessage("Your booking request has been saved successfully!");
    setForm({
      name: "",
      email: "",
      room: "1",
      checkin: "",
      checkout: "",
      guests: "1",
    });
  };

  return (
    <section className="section form-section">
      <div className="section-heading">
        <p className="eyebrow">RESERVATIONS</p>
        <h1>Book Your Stay</h1>
        <p>Complete the form below to reserve your room.</p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label>Select Room</label>
        <select name="room" value={form.room} onChange={handleChange}>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name} - ₦{room.price.toLocaleString()}
            </option>
          ))}
        </select>

        <div className="form-grid">
          <div>
            <label>Check-in Date</label>
            <input
              type="date"
              name="checkin"
              value={form.checkin}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Check-out Date</label>
            <input
              type="date"
              name="checkout"
              value={form.checkout}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label>Number of Guests</label>
        <select name="guests" value={form.guests} onChange={handleChange}>
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
        </select>

        <div className="selected-room">
          <span>Selected Room</span>
          <strong>{selectedRoom.name}</strong>
          <strong>₦{selectedRoom.price.toLocaleString()} / night</strong>
        </div>

        {message && <p className="form-message">{message}</p>}

        <button className="primary-btn full-btn" type="submit">
          Confirm Booking
        </button>
      </form>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFeedback("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Object.values(form).every((value) => value.trim())) {
      setFeedback("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setFeedback("Enter a valid email address.");
      return;
    }

    const messages = JSON.parse(localStorage.getItem("messages") || "[]");

    localStorage.setItem("messages", JSON.stringify([...messages, form]));

    setFeedback("Thank you! Your message has been received.");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="section contact-page">
      <div className="section-heading">
        <p className="eyebrow">GET IN TOUCH</p>
        <h1>Contact Us</h1>
        <p>We would love to hear from you.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-details">
          <h2>Let's Talk</h2>
          <p>Have questions about our rooms or services?</p>

          <p>
            <strong>Email:</strong> info@luxurystay.com
          </p>
          <p>
            <strong>Phone:</strong> +234 800 123 4567
          </p>
          <p>
            <strong>Address:</strong> Abuja, Nigeria
          </p>
          <p>
            <strong>Opening Hours:</strong> 24 hours daily
          </p>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Subject</label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <label>Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            required
          />

          {feedback && <p className="form-message">{feedback}</p>}

          <button className="primary-btn full-btn" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
