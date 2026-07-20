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
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center">
        Organizer Dashboard
      </h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <div className="rounded-lg border p-6 shadow">
          <h2 className="text-lg font-semibold">🎉 Total Events</h2>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>

        <div className="rounded-lg border p-6 shadow">
          <h2 className="text-lg font-semibold">🎟️ Total Bookings</h2>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>

        <div className="rounded-lg border p-6 shadow">
          <h2 className="text-lg font-semibold">💰 Total Revenue</h2>
          <p className="mt-2 text-3xl font-bold">$0</p>
        </div>

        <div className="rounded-lg border p-6 shadow">
          <h2 className="text-lg font-semibold">⭐ Total Reviews</h2>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>
      </div>

      {/* My Events */}
      <h2 className="text-2xl font-bold mb-4">
        My Events
      </h2>

      <div className="space-y-4">
        {sampleEvents.map((event) => (
          <div
            key={event.id}
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
        {sampleBookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-lg border p-4 shadow"
          >
            <h3 className="text-xl font-semibold">
              {booking.event}
            </h3>
            <p>👤 Attendee: {booking.attendee}</p>
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