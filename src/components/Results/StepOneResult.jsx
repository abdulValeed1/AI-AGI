import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Heart, Trophy, BarChart, Cpu } from 'lucide-react';

const valueAreas = [
  {
    title: "Operational Efficiency",
    icon: Zap,
    opportunities: [
      "Automate repetitive tasks to reduce manual labor and errors",
      "Optimize resource allocation through predictive analytics"
    ]
  },
  {
    title: "Customer Value",
    icon: Heart,
    opportunities: [
      "Personalize customer experiences using AI-driven insights",
      "Enhance customer support with intelligent chatbots"
    ]
  },
  {
    title: "Competitive Advantage",
    icon: Trophy,
    opportunities: [
      "Leverage AI for faster, data-driven decision making",
      "Develop AI-powered products to differentiate from competitors"
    ]
  },
  {
    title: "Reporting Intelligence",
    icon: BarChart,
    opportunities: [
      "Generate automated, insightful reports from complex data sets",
      "Provide real-time analytics dashboards for better visibility"
    ]
  },
  {
    title: "Technology Development",
    icon: Cpu,
    opportunities: [
      "Accelerate R&D processes with AI-assisted simulations",
      "Implement machine learning models to improve existing systems"
    ]
  }
];

const Icon = () => (
  <div className="w-16 h-16 bg-sky-300 rounded-full flex items-center justify-center">
    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 14l4-4 4 4" />
      <circle cx="16" cy="6" r="2" />
    </svg>
  </div>
);

const ListView = () => (
  <ul className="w-full space-y-6" >
    {valueAreas.map((area, index) => 
    {
      const IconComponent = area.icon;
      return (
      <li key={index} className="flex items-center space-x-4">
        <div className="w-32 h-32 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-800 rounded-full flex items-center justify-center">
            <IconComponent className="w-16 h-16 text-white" />
          </div>
        <div>
          <h3 className="text-white text-2xl font-bold">{area.title}</h3>
          <p className="text-white text-xl">{area.opportunities[0]}</p>
          <p className="text-white text-xl">{area.opportunities[1]}</p>
        </div>
      </li>
    )
  })}
  </ul>
);


// const TableView = () => (
//   <div className="overflow-x-auto">
//     <table className="w-full border-collapse">
//       <thead>
//         <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
//           <th className="border p-2 text-center ">Value Area</th>
//           <th className="border p-2 text-center">Opportunities</th>
//         </tr>
//       </thead>
//       <tbody>
//         {valueAreas.map((area, index) => (
//           <tr key={index} className='bg-gray-50'>
//             <td className="border p-2 font-bold text-center text-blue-600">{area.title}</td>
//             <td className="border p-2 text-left">
//               <ul className="list-disc list-inside">
//                 {area.opportunities.map((opp, oppIndex) => (
//                   <li key={oppIndex}>{opp}</li>
//                 ))}
//               </ul>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

const StepOneResult = () => {
  const navigate = useNavigate()
  return (
    <div className="p-8 w-full bg-gray-800 bg-opacity-30 rounded-lg p-4 backdrop-blur-sm">
      <h2 className="text-4xl font-bold mb-4 text-white text-center">AI Value Areas</h2>
      <ListView />
      <button 
        className="w-full mt-8 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-800  hover:border-2 text-white font-bold py-2 px-4 rounded"
        onClick={()=>{navigate("/chat/ai-responsible-use")}}
      >
        Go to the Next step
      </button>
    </div>
  );
};

export default StepOneResult;