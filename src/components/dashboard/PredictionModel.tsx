import React, { useState } from "react";
import { X, Send, Bot, User } from "lucide-react";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface ChatMessage {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
}

interface BotProps {
  show: boolean;
  onClose: () => void;
}

export const PredictionUploadPage: React.FC<BotProps> = ({ show, onClose }) => {
  if (!show) return null;

  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content: t("assistantGreeting"),
      timestamp: new Date(),
    },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (content: string, type: "bot" | "user") => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const removeLoadingMessage = () => {
    setMessages((prev) => prev.filter((msg) => msg.content !== "Loading..."));
  };

  const handleSendMessage = async () => {
    if (!currentInput.trim()) return;

    const userMessage = currentInput.trim();
    addMessage(userMessage, "user");
    setCurrentInput("");
    setIsLoading(true);
    addMessage("Loading...", "bot");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/chat`,
        {
          userInput: userMessage,
        }
      );

      const botReply =
        response.data.response || "Sorry, I didn't understand that.";

      removeLoadingMessage();
      addMessage(botReply, "bot");
    } catch (error) {
      console.error("Error sending prompt:", error);
      removeLoadingMessage();
      addMessage("Something went wrong. Please try again.", "bot");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen fixed inset-0 bg-opacity-50 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-lg h-[600px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-teal-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              CHW Assistant
            </h3>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" onClick={onClose} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === "user"
                    ? "bg-teal-600 text-white"
                    : "bg-white text-gray-900 border border-gray-200"
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.type === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4 text-teal-600" />
                  )}
                  <span className="text-xs opacity-70">
                    {message.type === "user" ? "You" : "Assistant"}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!currentInput.trim() || isLoading}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
