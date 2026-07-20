import { useState } from "react";

function Events() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const events = [
    {
      id: 1,
      title: "React Conference",
      category: "Conference",
      location: "Lahore",
      date: "2026-08-10",
    },
    {
      id: 2,
      title: "Music Festival",
      category: "Music",
      location: "Karachi",
      date: "2026-09-15",
    },
    {
      id: 3,
      title: "Tech Meetup",
      category: "Meetup",
      location: "Islamabad",
      date: "2026-10-20",
    },
  ];

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
            key={event.id}
            className="border rounded-lg shadow-md p-5"
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;