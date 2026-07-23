import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const sampleEvents = [
  {
    id: 1,
    title: "React Conference",
    location: "Lahore",
    date: "2026-08-15",
  },
  {
    id: 2,
    title: "Node.js Workshop",
    location: "Islamabad",
    date: "2026-09-05",
  },
];

const sampleBookings = [
  {
    id: 1,
    event: "React Conference",
    attendee: "Ali Khan",
    seats: 2,
  },
  {
    id: 2,
    event: "Node.js Workshop",
    attendee: "Sara Ahmed",
    seats: 1,
  },
];

const revenue = {
  totalRevenue: 1250,
  totalTransactions: 18,
  averageBookingValue: 69.44,
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalEvents: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalReviews: 0,
  });
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/dashboard`
        );

        setStats(response.data);
        const eventsResponse = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/events`
);

setEvents(eventsResponse.data);
const bookingsResponse = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/bookings`,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

setBookings(bookingsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardStats();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={logoutHandler}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>

        <button
          onClick={() => navigate("/create-event")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition ml-3"
        >
          Create Event
        </button>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center">
        Organizer Dashboard
      </h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <div className="rounded-lg border p-6 shadow">
          <h2 className="text-lg font-semibold">🎉 Total Events</h2>
          <p className="mt-2 text-3xl font-bold">
            {stats.totalEvents}
          </p>
        </div>

        <div className="rounded-lg border p-6 shadow">
          <h2 className="text-lg font-semibold">🎟️ Total Bookings</h2>
          <p className="mt-2 text-3xl font-bold">
            {stats.totalBookings}
          </p>
        </div>

        <div className="rounded-lg border p-6 shadow">
          <h2 className="text-lg font-semibold">💰 Total Revenue</h2>
          <p className="mt-2 text-3xl font-bold">
            ${stats.totalRevenue}
          </p>
        </div>

        <div className="rounded-lg border p-6 shadow">
          <h2 className="text-lg font-semibold">⭐ Total Reviews</h2>
          <p className="mt-2 text-3xl font-bold">
            {stats.totalReviews}
          </p>
        </div>
      </div>

      {/* My Events */}
      <h2 className="text-2xl font-bold mb-4">
        My Events
      </h2>

      <div className="space-y-4">
        {events.map((event) => (
          <div
           key={event._id}
            className="rounded-lg border p-4 shadow"
          >
            <h3 className="text-xl font-semibold">
              {event.title}
            </h3>
            <p>📍 {event.location}</p>
            <p>📅 {event.date}</p>
          </div>
        ))}
      </div>

      {/* Bookings */}
      <h2 className="text-2xl font-bold mt-10 mb-4">
        Bookings
      </h2>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="rounded-lg border p-4 shadow"
          >
            <h3 className="text-xl font-semibold">
              {booking.event.title}
            </h3>

            <p>👤 Attendee: {booking.user.name}</p>
            <p>🎟️ Seats: {booking.seats}</p>
          </div>
        ))}
      </div>

      {/* Revenue */}
      <h2 className="text-2xl font-bold mt-10 mb-4">
        Revenue
      </h2>

      <div className="rounded-lg border p-6 shadow">
        <p className="text-lg">
          💰 <strong>Total Revenue:</strong> ${revenue.totalRevenue}
        </p>

        <p className="mt-2 text-lg">
          🧾 <strong>Total Transactions:</strong>{" "}
          {revenue.totalTransactions}
        </p>

        <p className="mt-2 text-lg">
          📈 <strong>Average Booking Value:</strong> $
          {revenue.averageBookingValue}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;