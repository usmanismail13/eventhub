import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Events() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
  const fetchEvents = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/events`
    );

    setEvents(response.data);
  };

  fetchEvents();
}, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "" || event.category === category;

    const matchesLocation =
      location === "" || event.location === location;

    const matchesDate =
      date === "" || event.date === date;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLocation &&
      matchesDate
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-3">
        Events
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Discover upcoming events on EventHub.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md p-3 w-full"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-md p-3 w-full"
        >
          <option value="">All Categories</option>
          <option value="Conference">Conference</option>
          <option value="Music">Music</option>
          <option value="Meetup">Meetup</option>
        </select>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded-md p-3 w-full"
        >
          <option value="">All Locations</option>
          <option value="Lahore">Lahore</option>
          <option value="Karachi">Karachi</option>
          <option value="Islamabad">Islamabad</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-md p-3 w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
  key={event._id}
  onClick={() => navigate(`/events/${event._id}`)}
  className="border rounded-lg shadow-md p-5 cursor-pointer hover:shadow-lg"
>
            <h3 className="text-xl font-semibold mb-2">
              {event.title}
            </h3>

            <p>
              <strong>Category:</strong> {event.category}
            </p>

            <p>
              <strong>Location:</strong> {event.location}
            </p>

            <p>
              <strong>Date:</strong> {event.date}
            </p>
            <p>
  <strong>Description:</strong> {event.description}
</p>

<p>
  <strong>Available Seats:</strong> {event.availableSeats}
</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;