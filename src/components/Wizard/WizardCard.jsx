import React from "react";
import { Calendar, Eye, Shield, Sliders, AlertTriangle } from 'lucide-react';

function WizardCard({ currentArea, step }) {
  const IconComponent = currentArea.icon;

  const riskColor = (rating) => {
    const colors = [
      "bg-green-500",
      "bg-yellow-400",
      "bg-orange-500",
      "bg-red-500",
      "bg-red-700",
    ];
    return colors[rating - 1] || "bg-gray-500";
  };

  return (
    <div className="p-6 mb-6 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-xl shadow-lg">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">{currentArea.name}</h2>
      </div>

      {step === 2 && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">
                Application Types:
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentArea.applicationTypes.map((type) => (
                  <span
                    key={type}
                    className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs text-white"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">
                Horizon:
              </h4>
              <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs text-white">
                <Calendar className="w-3 h-3 inline mr-1" />
                {currentArea.horizon.period} (H{currentArea.horizon.number})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">
                Info Exposure:
              </h4>
              <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs text-white">
                <Eye className="w-3 h-3 inline mr-1" />
                {currentArea.infoExposure}
              </span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">
                Data Sensitivity:
              </h4>
              <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs text-white">
                <Shield className="w-3 h-3 inline mr-1" />
                {currentArea.dataSensitivity}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">
                Complexity of Usage:
              </h4>
              <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs text-white">
                <Sliders className="w-3 h-3 inline mr-1" />
                {currentArea.complexityOfUsage}
              </span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">
                Risk Rating:
              </h4>
              <span
                className={`px-2 py-1 rounded-full text-xs text-white ${riskColor(
                  currentArea.riskRating
                )}`}
              >
                <AlertTriangle className="w-3 h-3 inline mr-1" />
                {currentArea.riskRating} / 5
              </span>
            </div>
          </div>
        </>
      )}
        <div>
          <h4 className="text-sm font-semibold text-white mb-2">
            Opportunities:
          </h4>
          <ul className="list-disc list-inside text-white space-y-1 text-sm">
            {currentArea.opportunities.map((opportunity, index) => (
              <li key={index}>{opportunity}</li>
            ))}
          </ul>
        </div>
    </div>
  );
}

export default WizardCard;
