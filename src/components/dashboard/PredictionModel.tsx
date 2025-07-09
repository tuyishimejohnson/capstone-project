import { X, Send, MessageCircle, Bot, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

interface CaseData {
  type?: 'malaria' | 'nutrition' | 'maternal';
  patientName?: string;
  age?: string;
  gender?: string;
  symptoms?: string[];
  testResult?: string;
  nutritionStatus?: string;
  pregnancyStatus?: string;
  [key: string]: any;
}

// Prediction Upload Page
export const PredictionUploadPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your CHW Assistant. I can help you get recommendations for malaria, nutrition, or maternal cases. What type of case would you like to discuss today?",
      timestamp: new Date()
    }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [caseData, setCaseData] = useState<CaseData>({} as CaseData);
  const [currentStep, setCurrentStep] = useState<'type' | 'basic' | 'specific' | 'recommendation'>('type');
  const navigate = useNavigate();

  const addMessage = (content: string, type: 'bot' | 'user') => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;

    addMessage(currentInput, 'user');
    const userInput = currentInput.toLowerCase();
    setCurrentInput('');

    // Simulate bot response
    setTimeout(() => {
      handleBotResponse(userInput);
    }, 1000);
  };

  const handleBotResponse = (userInput: string) => {
    if (currentStep === 'type') {
      if (userInput.includes('malaria')) {
        setCaseData({ type: 'malaria' } as CaseData);
        setCurrentStep('basic');
        addMessage("Great! Let's gather information about the malaria case. What's the patient's name?", 'bot');
      } else if (userInput.includes('nutrition')) {
        setCaseData({ type: 'nutrition' } as CaseData);
        setCurrentStep('basic');
        addMessage("Perfect! Let's discuss the nutrition case. What's the patient's name?", 'bot');
      } else if (userInput.includes('maternal')) {
        setCaseData({ type: 'maternal' } as CaseData);
        setCurrentStep('basic');
        addMessage("Excellent! Let's talk about the maternal case. What's the patient's name?", 'bot');
      } else {
        addMessage("Please specify: malaria, nutrition, or maternal case?", 'bot');
      }
    } else if (currentStep === 'basic') {
      if (!caseData.patientName) {
        setCaseData(prev => ({ ...prev, patientName: userInput }));
        addMessage(`Thank you, ${userInput}. What's the patient's age?`, 'bot');
      } else if (!caseData.age) {
        setCaseData(prev => ({ ...prev, age: userInput }));
        addMessage("What's the patient's gender? (male/female)", 'bot');
      } else if (!caseData.gender) {
        setCaseData(prev => ({ ...prev, gender: userInput }));
        setCurrentStep('specific');
        addSpecificQuestion();
      }
    } else if (currentStep === 'specific') {
      handleSpecificResponse(userInput);
    }
  };

  const addSpecificQuestion = () => {
    if (caseData.type === 'malaria') {
      addMessage("What are the main symptoms? (fever, headache, chills, etc.)", 'bot');
    } else if (caseData.type === 'nutrition') {
      addMessage("What's the child's nutrition status? (normal, moderate_malnutrition, severe_malnutrition)", 'bot');
    } else if (caseData.type === 'maternal') {
      addMessage("What's the pregnancy status? (pregnant, postpartum, planning)", 'bot');
    }
  };

  const handleSpecificResponse = (userInput: string) => {
    if (caseData.type === 'malaria') {
      setCaseData(prev => ({ ...prev, symptoms: userInput.split(', ') }));
      addMessage("What's the test result? (positive/negative)", 'bot');
    } else if (caseData.type === 'nutrition') {
      setCaseData(prev => ({ ...prev, nutritionStatus: userInput }));
      addMessage("What's the child's weight in kg?", 'bot');
    } else if (caseData.type === 'maternal') {
      setCaseData(prev => ({ ...prev, pregnancyStatus: userInput }));
      addMessage("How many weeks of gestation?", 'bot');
    }

    // Add more specific questions based on the case type
    setTimeout(() => {
      setCurrentStep('recommendation');
      generateRecommendation();
    }, 1000);
  };

  const generateRecommendation = () => {
    let recommendation = "";
    
    if (caseData.type === 'malaria') {
      if (caseData.testResult === 'positive') {
        recommendation = `Based on the symptoms and positive test result for ${caseData.patientName}, I recommend:
        • Immediate treatment with antimalarial medication
        • Bed rest and hydration
        • Monitor for severe symptoms
        • Follow-up in 3 days
        • Use mosquito nets for prevention`;
      } else {
        recommendation = `For ${caseData.patientName} with negative test result:
        • Continue monitoring for symptoms
        • Consider other causes of fever
        • Maintain preventive measures
        • Re-test if symptoms persist`;
      }
    } else if (caseData.type === 'nutrition') {
      if (caseData.nutritionStatus === 'severe_malnutrition') {
        recommendation = `For ${caseData.patientName} with severe malnutrition:
        • Immediate referral to nutrition center
        • Therapeutic feeding program
        • Weekly monitoring
        • Family education on feeding practices
        • Vitamin A supplementation`;
      } else {
        recommendation = `For ${caseData.patientName}:
        • Balanced diet recommendations
        • Growth monitoring
        • Regular check-ups
        • Nutritional education for caregivers`;
      }
    } else if (caseData.type === 'maternal') {
      recommendation = `For ${caseData.patientName} (${caseData.pregnancyStatus}):
        • Regular antenatal visits
        • Proper nutrition and supplements
        • Rest and stress management
        • Emergency contact information
        • Birth preparedness plan`;
    }

    addMessage(recommendation, 'bot');
    addMessage("Would you like to save this case data or discuss another case?", 'bot');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-lg h-[600px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-teal-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              CHW Assistant
            </h3>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-900 border border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.type === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4 text-teal-600" />
                  )}
                  <span className="text-xs opacity-70">
                    {message.type === 'user' ? 'You' : 'Assistant'}
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
          />
          <button
            onClick={handleSendMessage}
            disabled={!currentInput.trim()}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
