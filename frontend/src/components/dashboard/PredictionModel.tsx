import { X, FileText, Upload } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Prediction Upload Page
export const PredictionUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Here you would typically upload the file and make predictions
      console.log("Uploading file:", selectedFile.name);
      alert(
        `File "${selectedFile.name}" uploaded successfully! Predictions will be processed.`
      );
      setSelectedFile(null);
      navigate("/dashboard"); // or wherever you want to go after upload
    }
  };

  const handleCancel = () => {
    navigate("/dashboard"); // or wherever you want to go on cancel
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Upload File for Predictions
            </h3>
            <p className="text-gray-600 mt-1">
              Upload a file to generate recommendations
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-teal-500 bg-teal-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />

          {selectedFile ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <FileText className="w-5 h-5 text-teal-600" />
                <span className="text-sm font-medium text-gray-900">
                  {selectedFile.name}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-gray-600">Drag and drop your file here, or</p>
              <label className="inline-block">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".csv,.xlsx,.xls,.json,.txt"
                />
                <span className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 cursor-pointer transition-colors">
                  Browse Files
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: CSV, Excel, JSON, TXT
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedFile
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Upload & Predict
          </button>
        </div>
      </div>
    </div>
  );
};
