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
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            {metric.title}
          </h3>
          <div className="flex items-baseline space-x-4">
            <span className="text-2xl font-bold">
              {" "}
              {metric.title.toLowerCase() === "pregnant women under care"
                ? maternal.length
                : metric.title.toLowerCase() === "malaria cases"
                ? malaria.length
                : metric.title.toLowerCase() === "children with malnutrition"
                ? nutrition.length
                : 0}
            </span>
          </div>
          {/* Display details for each category */}
          <div className="mt-2 space-y-1"></div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <div className={`flex items-center`}>
            <span className="ml-1 font-medium">{metric.percentage}%</span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              metric.status === "critical"
                ? "bg-red-500"
                : metric.status === "warning"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{ width: `${Math.min(metric.percentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
