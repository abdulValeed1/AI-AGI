import React, { useState, useRef } from "react";
import { Send, Bot, User, Star, HelpCircle } from "lucide-react";

const Tooltip = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="tooltip relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm bg-black bg-opacity-80 text-white rounded-md whitespace-nowrap z-10">
          {text}
          <div className="tooltip-arrow absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black border-opacity-80"></div>
        </div>
      )}
    </div>
  );
};

const Suggestions = ({SetSelectedMsg}) => {
  const defaultSuggestions = [
    {
      id: 1,
      text: "Operational Efficiency",
      recommended: true,
      question: "Could you please provide a few examples of implementing operational efficiency?",
      examples: [
        "Faster claim processing by a claims manager.",
        "Faster claim classification/segmentation by a claims manager.",
        "Quicker replies to positive emails by a sales manager.",
        "Faster conversions of meetings by a sales manager."
      ],
      selected: false,
    },
    {
      id: 2,
      text: "Customer Value",
      recommended: true,
      question: "Could you please provide a few examples of enhancing customer value?",
      examples: [
        "Implementing customer feedback loops.",
        "Offering personalized experiences based on customer data."
      ],
      selected: false,
    },
    {
      id: 3,
      text: "Competitive Advantage",
      recommended: true,
      question: "Could you please provide a few examples of achieving competitive advantage?",
      examples: [
        "Developing unique selling propositions in marketing.",
        "Leveraging exclusive partnerships."
      ],
      selected: false,
    },
    {
      id: 4,
      text: "Innovation",
      recommended: false,
      question: "Could you please provide a few examples of fostering innovation?",
      examples: [
        "Encouraging employee-led brainstorming sessions.",
        "Investing in R&D for new technologies."
      ],
      selected: false,
    },
    {
      id: 5,
      text: "Market Share",
      recommended: false,
      question: "Could you please provide a few examples of increasing market share?",
      examples: [
        "Launching targeted marketing campaigns.",
        "Offering competitive pricing strategies."
      ],
      selected: false,
    },
    {
      id: 6,
      text: "Employee Satisfaction",
      recommended: false,
      question: "Could you please provide a few examples of enhancing employee satisfaction?",
      examples: [
        "Implementing flexible work arrangements.",
        "Conducting regular employee feedback surveys."
      ],
      selected: false,
    },
    {
      id: 7,
      text: "Sustainability",
      recommended: false,
      question: "Could you please provide a few examples of promoting sustainability?",
      examples: [
        "Reducing carbon footprint in operations.",
        "Adopting sustainable sourcing practices."
      ],
      selected: false,
    },
  ];
  const [suggestions, SetSuggestions] = useState(defaultSuggestions)
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [example, setExample] = useState("");
  const messagesEndRef = useRef(null);

  const handleSuggestionClick = (suggestion) => {
    SetSuggestions(prevData => {
      const newData = [...prevData];
      const objectToUpdate = newData.find(item => item.id === suggestion.id);
      
      if (objectToUpdate && !objectToUpdate['selected']) {
        objectToUpdate['selected'] = true;
        SetSelectedMsg(prevSelected =>[...prevSelected, {
          question:suggestion.question,
          examples: suggestion.examples
        }])
      }
      return newData;
    });
    
  };
  return (
    <div className="mb-4">
      <h3 className="text-white text-lg mb-3">Suggestions:</h3>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
            <button
              onClick={() => handleSuggestionClick(suggestion)}
              className={`flex items-center justify-between px-4 py-2 rounded-full text-sm transition-all duration-200 
                      ${
                        suggestion.selected
                          ? "bg-blue-500 text-white ring-2 ring-green-500"
                          : "bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20"
                      }`}
            >
              <span className="flex items-center">
                {suggestion.recommended && (
                  <Star size={14} className="mr-2 text-yellow-400" fill="yellow" />
                )}
                {suggestion.text}
              </span>
            </button>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;