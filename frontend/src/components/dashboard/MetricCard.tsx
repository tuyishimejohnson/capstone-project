import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { HealthMetric } from "../../types";

interface MetricCardProps {
  metric: HealthMetric;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "good":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical":
        return <AlertCircle className="w-5 h-5" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5" />;
      case "good":
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return <Minus className="w-5 h-5" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4" />;
      case "down":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendColor = (trend: string, status: string) => {
    if (status === "critical" || status === "warning") {
      return trend === "up"
        ? "text-red-500"
        : trend === "down"
        ? "text-green-500"
        : "text-gray-500";
    }
    return trend === "up"
      ? "text-green-500"
      : trend === "down"
      ? "text-red-500"
      : "text-gray-500";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            {metric.title}
          </h3>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">
              {metric.value}
            </span>
            <span className="text-sm text-gray-500 ml-1">/ {metric.total}</span>
          </div>
        </div>
        <div
          className={`flex items-center px-2 py-1 rounded-full border ${getStatusColor(
            metric.status
          )}`}
        >
          {getStatusIcon(metric.status)}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <div
            className={`flex items-center ${getTrendColor(
              metric.trend,
              metric.status
            )}`}
          >
            {getTrendIcon(metric.trend)}
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
