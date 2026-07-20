import { useEffect, useState } from "react";
import axios from "axios";
import PaymentButton from "../components/PaymentButton";

function EventDetails() {
  const [comments, setComments] = useState([]);

  // Temporary event ID for testing
  const eventId = "YOUR_EVENT_ID";

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

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        Event Details
      </h1>

      <p className="text-gray-600 mb-6">
        View complete information about an event.
      </p>

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
              <p className="mb-2">{comment.text}</p>

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