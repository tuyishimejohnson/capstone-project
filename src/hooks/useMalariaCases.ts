import { useState, useEffect } from "react";
import axios from "axios";

export function useMalariaCases() {
  const [malariaCases, setMalariaCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMalariaData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/malaria`
        );
        setMalariaCases(response.data);
      } catch (error) {
        // console.log("Error while receiving malaria data", error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };
    getMalariaData();
  }, [malariaCases]);

  return { malariaCases, loading };
}
