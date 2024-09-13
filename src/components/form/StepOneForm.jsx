import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StepOneForm = () => {
  const navigate = useNavigate()
  const [role, setRole] = useState('');
  const [industry, setIndustry] = useState('');
  const [specificArea, setSpecificArea] = useState('');
  const [message, setMessage] = useState('');

  const roles = ['Manager', 'Developer', 'System Architect', 'Designer', 'Product Owner'];
  const industries = ['Finance', 'Insurance', 'Medical', 'Technology', 'Education'];
  const specificAreas = {
    Finance: ['Banking', 'Investment', 'Accounting', 'Financial Planning'],
    Insurance: ['Motor Insurance', 'Health Insurance', 'Life Insurance', 'Property Insurance'],
    Medical: ['Healthcare', 'Pharmaceuticals', 'Medical Devices', 'Biotechnology'],
    Technology: ['Software Development', 'Cybersecurity', 'Cloud Computing', 'Artificial Intelligence'],
    Education: ['K-12', 'Higher Education', 'Online Learning', 'Special Education']
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ role, industry, specificArea, message });
    navigate("/chat/growth-plan")
    // Here you would typically send this data to a server or perform other actions
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6 p-8">
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Who are you?</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select a role</option>
            {roles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
          <select
            id="industry"
            value={industry}
            onChange={(e) => {
              setIndustry(e.target.value);
              setSpecificArea('');
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select an industry</option>
            {industries.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>

        {industry && (
          <div>
            <label htmlFor="specificArea" className="block text-sm font-medium text-gray-700">Specific Area</label>
            <select
              id="specificArea"
              value={specificArea}
              onChange={(e) => setSpecificArea(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select a specific area</option>
              {specificAreas[industry].map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter your message here"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepOneForm;