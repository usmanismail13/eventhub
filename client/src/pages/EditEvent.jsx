import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function EditEvent() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    availableSeats: ""
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/events/${id}`
        );

        setEvent(response.data);

        setFormData({
          title: response.data.title || "",
          description: response.data.description || "",
          category: response.data.category || "",
          location: response.data.location || "",
          date: response.data.date || "",
          availableSeats: response.data.availableSeats || ""
        });

      } catch (error) {
        console.log(error);
      }
    };

    fetchEvent();

  }, [id]);


  const updateEvent = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/events/${id}`,
        formData
      );

      alert("Event updated successfully");

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-4">
        Edit Event
      </h1>

      {event ? (
        <form 
          onSubmit={updateEvent}
          className="space-y-4"
        >

          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value
              })
            }
            className="border rounded p-3 w-full"
            placeholder="Event title"
          />

          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value
              })
            }
            className="border rounded p-3 w-full"
            placeholder="Description"
          />

          <input
            type="text"
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value
              })
            }
            className="border rounded p-3 w-full"
            placeholder="Category"
          />

          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: e.target.value
              })
            }
            className="border rounded p-3 w-full"
            placeholder="Location"
          />

          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({
                ...formData,
                date: e.target.value
              })
            }
            className="border rounded p-3 w-full"
          />

          <input
            type="number"
            value={formData.availableSeats}
            onChange={(e) =>
              setFormData({
                ...formData,
                availableSeats: e.target.value
              })
            }
            className="border rounded p-3 w-full"
            placeholder="Available Seats"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update Event
          </button>

        </form>
      ) : (
        <p>
          Loading event...
        </p>
      )}

    </div>
  );
}

export default EditEvent;