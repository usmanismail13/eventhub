import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentButton from "../components/PaymentButton";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
const [reviews, setReviews] = useState([]);
const [event, setEvent] = useState(null);

  const eventId = id;

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/comments/${eventId}`
      );
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchReviews = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/reviews`
    );

    setReviews(response.data);
  } catch (error) {
    console.log(error);
  }
};

  const fetchEvent = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}`
      );
      setEvent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBook = async () => {
    try {
      const token = localStorage.getItem("token");

      // Stop request if user is not logged in
      if (!token) {
        alert("You must be logged in to book an event.");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        {
          // NOTE: If this still gives a 400 error, change 'eventId' back to 'event'
          eventId: eventId,
          // NOTE: If this still gives a 400 error, change 'tickets' back to 'seats'
          tickets: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking created successfully!");
      console.log(response.data);
    } catch (error) {
      // Logs the exact error message from your server to your browser console
      console.error("Booking Error Details:", error.response?.data);
      
      const serverMessage = error.response?.data?.message || error.response?.data?.error;
      alert(`Booking failed: ${serverMessage || "Unknown server error."}`);
    }
  };

  useEffect(() => {
  fetchEvent();
  fetchComments();
  fetchReviews();
}, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        Event Details
      </h1>

      {event ? (
        <div className="mb-6 space-y-2">
          <h2 className="text-2xl font-bold">
            {event.title}
          </h2>
          <p>
            <strong>Description:</strong> {event.description}
          </p>
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
            <strong>Available Seats:</strong> {event.availableSeats}
          </p>
        </div>
      ) : (
        <p className="text-gray-600 mb-6">
          Loading event details...
        </p>
      )}

      <div className="mb-8">
        <button
          onClick={handleBook}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mb-4"
        >
          Book Event
        </button>
        <PaymentButton />
      </div>

      <hr className="my-8" />
      {reviews.length === 0 ? (
  <p className="text-gray-500 mb-6">
    No reviews yet.
  </p>
) : (
  <div className="space-y-4 mb-8">
    {reviews.map((review) => (
      <div
        key={review._id}
        className="border rounded-lg p-4 shadow-sm"
      >
        <p className="mb-2">
          ⭐ Rating: {review.rating}/5
        </p>

        <p className="mb-2">
          {review.comment}
        </p>

        <small className="text-gray-500">
          By {review.user?.name || "User"}
        </small>
      </div>
    ))}
  </div>
)}

      <h2 className="text-2xl font-semibold mb-4">
  Reviews
</h2>

      <h2 className="text-2xl font-semibold mb-4">
        Comments
      </h2>

      {comments.length === 0 ? (
        <p className="text-gray-500">
          No comments yet.
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="border rounded-lg p-4 shadow-sm"
            >
              <p className="mb-2">
                {comment.text}
              </p>
              <small className="text-gray-500">
                By {comment.user?.name || "User"}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventDetails;
