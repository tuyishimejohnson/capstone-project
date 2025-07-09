import { useState, useEffect } from "react";
import axios from "axios";

export function useNutritionData() {
  const [nutritionData, setNutritionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNutritionData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/nutrition`
        );
        setNutritionData(response.data);
      } catch (error) {
        // console.log("Error while receiving nutrition data", error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };
    getNutritionData();
  }, []);

  return { nutritionData, loading };
} 