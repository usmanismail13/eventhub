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
        `http://localhost:5000/api/comments/${eventId}`
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
    <div>
      <h1>Event Details Page</h1>

      <p>View complete information about an event.</p>

      <PaymentButton />

      <hr />

      <h2>Comments</h2>

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.text}</p>

            <small>
              By {comment.user?.name || "User"}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default EventDetails;