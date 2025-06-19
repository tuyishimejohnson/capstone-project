import React from "react";
import {
  Calendar,
  Shield,
  BookOpen,
  Truck,
  TestTube,
  AlertTriangle,
  Clock,
  CheckCircle,
} from "lucide-react";
import type { Suggestion } from "../../types";

interface SuggestionCardProps {
  suggestion: Suggestion;
}

const iconMap = {
  Calendar,
  Shield,
  BookOpen,
  Truck,
  TestTube,
};

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  suggestion,
}) => {
  const IconComponent =
    iconMap[suggestion.icon as keyof typeof iconMap] || AlertTriangle;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "maternal":
        return "bg-pink-50 border-pink-200";
      case "malaria":
        return "bg-blue-50 border-blue-200";
      case "nutrition":
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div
      className={`rounded-xl p-6 border-2 transition-all duration-200 hover:shadow-md ${getCategoryColor(
        suggestion.category
      )}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-sm">
            <IconComponent className="w-5 h-5 text-gray-700" />
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-gray-900">{suggestion.title}</h3>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                suggestion.priority
              )}`}
            >
              {suggestion.priority === "high" && (
                <AlertTriangle className="w-3 h-3 mr-1" />
              )}
              {suggestion.priority === "medium" && (
                <Clock className="w-3 h-3 mr-1" />
              )}
              {suggestion.priority === "low" && (
                <CheckCircle className="w-3 h-3 mr-1" />
              )}
              {suggestion.priority.charAt(0).toUpperCase() +
                suggestion.priority.slice(1)}{" "}
              Priority
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed mb-4">
        {suggestion.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {suggestion.category.replace("_", " ")}
        </span>
        <button className="text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors">
          View Details →
        </button>
      </div>
    </div>
  );
};
