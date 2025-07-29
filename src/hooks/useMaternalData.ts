import { useState, useEffect } from "react";
import axios from "axios";

export function useMaternalData() {
  const [maternalData, setMaternalData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMaternalData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/maternal`
        );
        setMaternalData(response.data);
      } catch (error) {
        // console.log("Error while receiving maternal data", error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };
    getMaternalData();
  }, [maternalData]);

  return { maternalData, loading };
}
