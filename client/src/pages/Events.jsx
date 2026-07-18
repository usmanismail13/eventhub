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
    <div>
      <h1>Events Page</h1>
      <p>Discover upcoming events on EventHub.</p>

      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">All Categories</option>
  <option value="Conference">Conference</option>
  <option value="Music">Music</option>
  <option value="Meetup">Meetup</option>
</select>
<select
  value={location}
  onChange={(e) => setLocation(e.target.value)}
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
/>

      {filteredEvents.map((event) => (
        <div key={event.id}>
          <h3>{event.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default Events;