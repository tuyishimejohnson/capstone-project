import { useState, useEffect } from "react";
import axios from "axios";

export function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleBookings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/appointments`
        );
        setBookings(response.data);
      } catch (error) {
        // console.log("=====+++++++++++++++++++++++0 error while receiving data", error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };
    handleBookings();
  }, []);

  return { bookings, loading };
} 