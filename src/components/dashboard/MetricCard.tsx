import React from "react";
import type { HealthMetric } from "../../types";
import { useState, useEffect } from "react";
import axios from "axios";
import { healthMetrics } from "../../data/mockData";

interface MetricCardProps {
  metric: HealthMetric;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const [maternal, setMaternal] = useState<any[]>([]);
  const [malaria, setMalaria] = useState<any[]>([]);
  const [nutrition, setNutrition] = useState<any[]>([]);
  useEffect(() => {
    const getMaternalData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/maternal`
        );
        setMaternal(response.data);
      } catch (error) {
        console.log("Error while receiving maternal data", error);
      }
    };
    getMaternalData();
  }, []);

  useEffect(() => {
    const getNutritionData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/nutrition`
        );
        setNutrition(response.data);
      } catch (error) {
        console.log("Error while receiving nutrition data", error);
      }
    };
    getNutritionData();
  }, []);

  useEffect(() => {
    const getMalariaData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/malaria`
        );
        setMalaria(response.data);
      } catch (error) {
        console.log("Error while receiving malaria data", error);
      }
    };
    getMalariaData();
  }, []);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4"></div>
      <div className="space-y-3"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white h-24 text-center text-2xl ">
        <div className="bg-teal-600 rounded-md shadow-md hover:translate-x-1 transition-all">
          Pregnant Women Under Care
        </div>
        <div
          className="bg-teal-600 rounded-md shadow-md hover:translate-x-1 transition-all"
          onClick={() => setActiveCases(true)}
        >
          <h2>Malaria Cases</h2>
          <span>{}</span>
        </div>
        <div className="bg-teal-600 rounded-md shadow-md hover:translate-x-1 transition-all">
          Children with Malnutrition
        </div>

        {}
      </div>
    </div>
  );
};
