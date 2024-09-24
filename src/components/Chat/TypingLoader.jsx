import React from 'react';

const TypingLoader = () => {
  return (
    <div className="flex items-center space-x-1">
      <div className="dot bg-gray-800 rounded-full w-2.5 h-2.5 animate-bounce"></div>
      <div className="dot bg-gray-800 rounded-full w-2.5 h-2.5 animate-bounce200"></div>
      <div className="dot bg-gray-800 rounded-full w-2.5 h-2.5 animate-bounce400"></div>
    </div>
  );
};

export default TypingLoader;