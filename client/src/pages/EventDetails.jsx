import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PaymentButton from "../components/PaymentButton";

function EventDetails() {
  const { id } = useParams();

  const [comments, setComments] = useState([]);
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

  useEffect(() => {
    fetchEvent();
    fetchComments();
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
        <PaymentButton />
      </div>

      <hr className="my-8" />

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