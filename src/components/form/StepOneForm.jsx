import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StepOneForm = () => {
  const navigate = useNavigate()
  const [mainInfo, setMainInfo] = useState({ persona: '', businessVertical: '', winningAspiration: '' });
  const [isMainInfoSubmitted, setIsMainInfoSubmitted] = useState(false);
  const [focusAreas, setFocusAreas] = useState([]);
  const [newFocusArea, setNewFocusArea] = useState({ 
    priorityOutcome: '', 
    measurableTarget: '', 
    risksAndDependencies: '' 
  });

  const handleMainInfoChange = (e) => {
    setMainInfo({ ...mainInfo, [e.target.name]: e.target.value });
  };

  const submitMainInfo = () => {
    if (mainInfo.persona && mainInfo.businessVertical && mainInfo.winningAspiration) {
      setIsMainInfoSubmitted(true);
    } else {
      alert('Please fill all main info fields before submitting.');
    }
  };

  const handleFocusAreaChange = (e) => {
    setNewFocusArea({ ...newFocusArea, [e.target.name]: e.target.value });
  };

  const addFocusArea = () => {
    if (newFocusArea.priorityOutcome.trim() !== '') {
      setFocusAreas([...focusAreas, newFocusArea]);
      setNewFocusArea({ priorityOutcome: '', measurableTarget: '', risksAndDependencies: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/chat/linked-ai-value")
    // Here you would typically send this data to a server or perform other actions
  };

  return (
    <div className="bg-gray-900 text-white p-6 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Business Planning Input Form</h1>
      
      {/* Main Info Section */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">Persona</label>
            <input 
              type="text" 
              name="persona"
              value={mainInfo.persona}
              onChange={handleMainInfoChange}
              disabled={isMainInfoSubmitted}
              className="w-full bg-gray-800 border border-gray-700 rounded p-2" 
            />
          </div>
          <div>
            <label className="block mb-1">Business Vertical</label>
            <input 
              type="text" 
              name="businessVertical"
              value={mainInfo.businessVertical}
              onChange={handleMainInfoChange}
              disabled={isMainInfoSubmitted}
              className="w-full bg-gray-800 border border-gray-700 rounded p-2" 
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Winning Aspiration</label>
          <input 
            type="text" 
            name="winningAspiration"
            value={mainInfo.winningAspiration}
            onChange={handleMainInfoChange}
            disabled={isMainInfoSubmitted}
            className="w-full bg-gray-800 border border-gray-700 rounded p-2" 
          />
        </div>
        {!isMainInfoSubmitted && (
          <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={submitMainInfo}
          >
            Submit Business Context
          </button>
        )}
      </div>

      {/* Add Focus Area Section */}
      {isMainInfoSubmitted && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Add Focus Area</h2>
          <div className="space-y-2">
            <input 
              type="text" 
              name="priorityOutcome"
              placeholder="Priority Outcome"
              value={newFocusArea.priorityOutcome}
              onChange={handleFocusAreaChange}
              className="w-full bg-gray-800 border border-gray-700 rounded p-2"
            />
            <input 
              type="text" 
              name="measurableTarget"
              placeholder="Measurable Target"
              value={newFocusArea.measurableTarget}
              onChange={handleFocusAreaChange}
              className="w-full bg-gray-800 border border-gray-700 rounded p-2"
            />
            <input 
              type="text" 
              name="risksAndDependencies"
              placeholder="Risks and Dependencies"
              value={newFocusArea.risksAndDependencies}
              onChange={handleFocusAreaChange}
              className="w-full bg-gray-800 border border-gray-700 rounded p-2"
            />
            <button 
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={addFocusArea}
            >
              Add Focus Area
            </button>
          </div>
        </div>
      )}

      {/* Focus Area Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {focusAreas.map((area, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded">
            <h3 className="text-lg font-semibold mb-3">Focus Area {index + 1}</h3>
            <h4 className="font-semibold mb-2">Priority Outcome</h4>
            <p className="bg-gray-700 border border-gray-600 rounded p-2 mb-2">{area.priorityOutcome}</p>
            <h4 className="font-semibold mb-2">Measurable Target</h4>
            <p className="bg-gray-700 border border-gray-600 rounded p-2 mb-2">{area.measurableTarget}</p>
            <h4 className="font-semibold mb-2">Risks and Dependencies</h4>
            <p className="bg-gray-700 border border-gray-600 rounded p-2">{area.risksAndDependencies}</p>
          </div>
        ))}
      </div>
      <button 
              className={`w-full space-x-2 p-2 rounded-lg border transition duration-200 
                ${isMainInfoSubmitted && focusAreas.length ? 
                    'bg-gray-800 text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer' : 
                    'bg-gray-500 text-gray-300 border-gray-500 cursor-not-allowed'
                }`}
              onClick={handleSubmit}
              disabled={!isMainInfoSubmitted || !focusAreas.length}
            >
              Go To the Next Step
      </button>
    </div>
  );
};

export default StepOneForm;