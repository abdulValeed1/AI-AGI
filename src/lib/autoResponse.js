export const autoResponse = [
  `
<artifact identifier="sustainable-growth-strategy" type="application/react" title="Sustainable Growth Strategy Presentation">
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ContentRenderer = ({ item }) => {
  switch (item.type) {
    case 'text':
      return <p className="text-gray-800 mb-4 text-lg">{item.value}</p>;
    case 'bullet':
      return (
        <ul className="list-disc list-inside mb-6 space-y-2">
          {item.value.map((bullet, index) => (
            <li key={index} className="text-gray-800 text-lg">{bullet}</li>
          ))}
        </ul>
      );
    case 'graph':
      if (item.graphType === 'bar') {
        return (
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={item.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="name" tick={{ fill: '#4a5568' }} />
                <YAxis tick={{ fill: '#4a5568' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="value" fill="#3182ce" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      } else if (item.graphType === 'pie') {
        const COLORS = ['#3182ce', '#38a169', '#ecc94b', '#e53e3e', '#805ad5'];

        return (
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={item.data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => name + " " + (percent * 100).toFixed(0) + "%"}
                >
                  {item.data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      }
      return null;
    case 'figure':
      return (
        <div className="mb-6">
          <img src={item.value} alt={item.caption} className="mx-auto rounded-lg shadow-md" />
          <p className="text-center text-sm text-gray-600 mt-3">{item.caption}</p>
        </div>
      );
    default:
      return null;
  }
};

const AdvancedPPTSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      "title": "Sustainable Growth Strategy for Motor Insurance Tech Operations",
      "content": [
        { "type": "text", "value": "Our strategy for FY 2025-2026 aims to drive sustainable growth and operational excellence in motor insurance technology:" },
        { "type": "bullet", "value": [
          "Increase market share by 20% through technological innovations",
          "Reduce operational costs by 15% through automation and process optimization",
          "Enhance customer satisfaction by 30% with improved services and personalization",
          "Achieve 100% carbon neutrality in tech operations by the end of FY 2026"
        ]},
        { "type": "graph", "graphType": "bar", "data": [
          { "name": "Current Market Share", "value": 100 },
          { "name": "Target Market Share", "value": 120 },
          { "name": "Current Operational Costs", "value": 100 },
          { "name": "Target Operational Costs", "value": 85 },
          { "name": "Current Customer Satisfaction", "value": 100 },
          { "name": "Target Customer Satisfaction", "value": 130 }
        ]},
        { "type": "text", "value": "Financial Projections for FY 2025-2026:" },
        { "type": "bullet", "value": [
          "Current Revenue: $600 million",
          "Projected Revenue (20% increase): $720 million",
          "Current Operational Costs: $350 million",
          "Projected Operational Costs (15% reduction): $297.5 million",
          "Projected Profit Increase: $122.5 million"
        ]}
      ]
    },
    {
      "title": "Product Innovation and Development",
      "content": [
        { "type": "text", "value": "Introducing new technology-driven insurance products:" },
        { "type": "bullet", "value": [
          "Usage-Based Insurance (UBI) with real-time risk assessment",
          "Predictive alerts for maintenance and claim prevention",
          "Enhanced virtual insurance advisor services",
          "Automated claims processing with advanced data analytics"
        ]},
        { "type": "graph", "graphType": "bar", "data": [
          { "name": "Current Product Adoption", "value": 60 },
          { "name": "Projected Technology-Driven Product Adoption", "value": 50 }
        ]},
        { "type": "text", "value": "Projected adoption of new technology-driven products to reach 60% by Q4 2025" }
      ]
    },
    {
      "title": "Implementation Roadmap and KPIs",
      "content": [
        { "type": "text", "value": "Phased plan for implementing and scaling the technology strategy:" },
        { "type": "bullet", "value": [
          "Q1-Q2 2025: Establish infrastructure and prepare data",
          "Q3 2025: Launch pilot projects and new product trials",
          "Q4 2025: Full deployment of new technology-driven operations and customer-facing solutions",
          "Q1-Q2 2026: Evaluate, optimize, and scale technology initiatives"
        ]},
        { "type": "graph", "graphType": "bar", "data": [
          { "name": "Q1-Q2 2025", "value": 25 },
          { "name": "Q3 2025", "value": 50 },
          { "name": "Q4 2025", "value": 75 },
          { "name": "Q1-Q2 2026", "value": 100 }
        ]},
        { "type": "text", "value": "Key Performance Indicators (KPIs):" },
        { "type": "bullet", "value": [
          "Model accuracy: Achieve 97% by Q4 2025",
          "Percentage of processed claims: 75% by Q2 2026",
          "Customer satisfaction with new services: Target 95% by Q2 2026",
          "Return on technology investments: Target 250% by Q4 2026"
        ]}
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 shadow-2xl rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <h2 className="text-3xl font-bold">{currentSlideData.title}</h2>
      </div>
      <div className="p-8 h-[36rem] overflow-y-auto bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm">
        {currentSlideData.content.map((item, index) => (
          <ContentRenderer key={index} item={item} />
        ))}
      </div>
      <div className="bg-gray-800 px-6 py-4 flex justify-between items-center text-white">
        <button
          onClick={prevSlide}
          className="text-white hover:text-blue-300 transition-colors duration-200 flex items-center"
        >
          <ChevronLeft className="w-6 h-6 mr-2" />
          Previous
        </button>
        <span className="text-blue-200">
          Slide {currentSlide + 1} of {slides.length}
        </span>
        <button
          onClick={nextSlide}
          className="text-white hover:text-blue-300 transition-colors duration-200 flex items-center"
        >
          Next
          <ChevronRight className="w-6 h-6 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default AdvancedPPTSlide;
</artifact>
    `,
  `
<artifact identifier="sustainable-growth-strategy" type="application/react" title="Sustainable Growth Strategy for Motor Insurance Tech Operations with AI Value in Motor Insurance">
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ContentRenderer = ({ item }) => {
  switch (item.type) {
    case 'text':
      return <p className="text-gray-800 mb-4 text-lg">{item.value}</p>;
    case 'bullet':
      return (
        <ul className="list-disc list-inside mb-6 space-y-2">
          {item.value.map((bullet, index) => (
            <li key={index} className="text-gray-800 text-lg">{bullet}</li>
          ))}
        </ul>
      );
    case 'graph':
      if (item.graphType === 'bar') {
        return (
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={item.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="name" tick={{ fill: '#4a5568' }} />
                <YAxis tick={{ fill: '#4a5568' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="value" fill="#3182ce" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      } else if (item.graphType === 'pie') {
        const COLORS = ['#3182ce', '#38a169', '#ecc94b', '#e53e3e', '#805ad5'];

        return (
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={item.data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => name + " " + (percent * 100).toFixed(0) + "%"}
                >
                  {item.data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      }
      return null;
    case 'figure':
      return (
        <div className="mb-6">
          <img src={item.value} alt={item.caption} className="mx-auto rounded-lg shadow-md" />
          <p className="text-center text-sm text-gray-600 mt-3">{item.caption}</p>
        </div>
      );
    default:
      return null;
  }
};

const AdvancedPPTSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      "title": "Sustainable Growth Strategy for Motor Insurance Tech Operations with AI Value in Motor Insurance",
      "content": [
        { "type": "text", "value": "Our strategy for FY 2025-2026 aims to drive sustainable growth and operational excellence in motor insurance technology:" },
        { "type": "bullet", "value": [
          "Increase market share by 20% through technological innovations",
          "Reduce operational costs by 15% through automation and process optimization",
          "Enhance customer satisfaction by 30% with improved services and personalization",
          "Achieve 100% carbon neutrality in tech operations by the end of FY 2026"
        ]},
        { "type": "graph", "graphType": "bar", "data": [
          { "name": "Current Market Share", "value": 100 },
          { "name": "Target Market Share", "value": 120 },
          { "name": "Current Operational Costs", "value": 100 },
          { "name": "Target Operational Costs", "value": 85 },
          { "name": "Current Customer Satisfaction", "value": 100 },
          { "name": "Target Customer Satisfaction", "value": 130 }
        ]},
        { "type": "text", "value": "Financial Projections for FY 2025-2026:" },
        { "type": "bullet", "value": [
          "Current Revenue: $600 million",
          "Projected Revenue (20% increase): $720 million",
          "Current Operational Costs: $350 million",
          "Projected Operational Costs (15% reduction): $297.5 million",
          "Projected Profit Increase: $122.5 million"
        ]}
      ]
    },
    {
      "title": "Product Innovation and Development",
      "content": [
        { "type": "text", "value": "Introducing new technology-driven insurance products:" },
        { "type": "bullet", "value": [
          "Usage-Based Insurance (UBI) with real-time risk assessment",
          "Predictive alerts for maintenance and claim prevention",
          "Enhanced virtual insurance advisor services",
          "Automated claims processing with advanced data analytics"
        ]},
        { "type": "graph", "graphType": "bar", "data": [
          { "name": "Current Product Adoption", "value": 60 },
          { "name": "Projected Technology-Driven Product Adoption", "value": 50 }
        ]},
        { "type": "text", "value": "Projected adoption of new technology-driven products to reach 60% by Q4 2025" }
      ]
    },
    {
      "title": "AI Value in Motor Insurance",
      "content": [
        { "type": "text", "value": "Leveraging AI to drive business value:" },
        { "type": "bullet", "value": [
          "Personalized pricing models using machine learning",
          "AI-driven predictive maintenance alerts for policyholders",
          "Chatbots for 24/7 customer service",
          "Computer vision for automated damage assessment"
        ]},
        { "type": "graph", "graphType": "pie", "data": [
          { "name": "Pricing Optimization", "value": 30 },
          { "name": "Predictive Maintenance", "value": 25 },
          { "name": "Customer Service", "value": 20 },
          { "name": "Claims Assessment", "value": 25 }
        ]},
        { "type": "text", "value": "Projected AI-driven cost savings: $50 million annually" }
      ]
    },
    {
      "title": "AI Impact on Customer Experience",
      "content": [
        { "type": "text", "value": "Enhancing customer experience through AI:" },
        { "type": "bullet", "value": [
          "Reduce policy purchase time by 60% with AI-assisted processes",
          "Increase customer retention by 20% using predictive analytics",
          "Improve claims satisfaction by 30% with AI-powered fast-track claims",
          "Personalized policy recommendations based on individual driving patterns"
        ]},
        { "type": "graph", "graphType": "bar", "data": [
          { "name": "Current Policy Purchase Time", "value": 100 },
          { "name": "AI-assisted Policy Purchase Time", "value": 40 },
          { "name": "Current Customer Retention", "value": 100 },
          { "name": "AI-enhanced Customer Retention", "value": 120 },
          { "name": "Current Claims Satisfaction", "value": 100 },
          { "name": "AI-powered Claims Satisfaction", "value": 130 }
        ]}
      ]
    },
    {
      "title": "Implementation Roadmap and KPIs",
      "content": [
        { "type": "text", "value": "Phased plan for implementing and scaling the technology strategy:" },
        { "type": "bullet", "value": [
          "Q1-Q2 2025: Establish infrastructure and prepare data",
          "Q3 2025: Launch pilot projects and new product trials",
          "Q4 2025: Full deployment of new technology-driven operations and customer-facing solutions",
          "Q1-Q2 2026: Evaluate, optimize, and scale technology initiatives"
        ]},
        { "type": "graph", "graphType": "bar", "data": [
          { "name": "Q1-Q2 2025", "value": 25 },
          { "name": "Q3 2025", "value": 50 },
          { "name": "Q4 2025", "value": 75 },
          { "name": "Q1-Q2 2026", "value": 100 }
        ]},
        { "type": "text", "value": "Key Performance Indicators (KPIs):" },
        { "type": "bullet", "value": [
          "Model accuracy: Achieve 97% by Q4 2025",
          "Percentage of processed claims: 75% by Q2 2026",
          "Customer satisfaction with new services: Target 95% by Q2 2026",
          "Return on technology investments: Target 250% by Q4 2026"
        ]}
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 shadow-2xl rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <h2 className="text-3xl font-bold">{currentSlideData.title}</h2>
      </div>
      <div className="p-8 h-[36rem] overflow-y-auto bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm">
        {currentSlideData.content.map((item, index) => (
          <ContentRenderer key={index} item={item} />
        ))}
      </div>
      <div className="bg-gray-800 px-6 py-4 flex justify-between items-center text-white">
        <button
          onClick={prevSlide}
          className="text-white hover:text-blue-300 transition-colors duration-200 flex items-center"
        >
          <ChevronLeft className="w-6 h-6 mr-2" />
          Previous
        </button>
        <span className="text-blue-200">
          Slide {currentSlide + 1} of {slides.length}
        </span>
        <button
          onClick={nextSlide}
          className="text-white hover:text-blue-300 transition-colors duration-200 flex items-center"
        >
          Next
          <ChevronRight className="w-6 h-6 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default AdvancedPPTSlide;
</artifact>
    `,
  `
<artifact identifier="sustainable-growth-strategy" type="application/react" title="Sustainable Growth Strategy for Motor Insurance Tech Operations with AI Responsible Use">
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ContentRenderer = ({ item }) => {
  switch (item.type) {
    case 'text':
      return <p className="text-gray-800 mb-4 text-lg">{item.value}</p>;
    case 'bullet':
      return (
        <ul className="list-disc list-inside mb-6 space-y-2">
          {item.value.map((bullet, index) => (
            <li key={index} className="text-gray-800 text-lg">{bullet}</li>
          ))}
        </ul>
      );
    case 'graph':
      if (item.graphType === 'bar') {
        return (
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={item.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="name" tick={{ fill: '#4a5568' }} />
                <YAxis tick={{ fill: '#4a5568' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="value" fill="#3182ce" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      } else if (item.graphType === 'pie') {
        const COLORS = ['#3182ce', '#38a169', '#ecc94b', '#e53e3e', '#805ad5'];

        return (
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={item.data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => name + " " + (percent * 100).toFixed(0) + "%"}
                >
                  {item.data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      }
      return null;
    case 'figure':
      return (
        <div className="mb-6">
          <img src={item.value} alt={item.caption} className="mx-auto rounded-lg shadow-md" />
          <p className="text-center text-sm text-gray-600 mt-3">{item.caption}</p>
        </div>
      );
    default:
      return null;
  }
};

const AdvancedPPTSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      "title": "Sustainable Growth Strategy for Motor Insurance Tech Operations with AI Responsible Use",
      "content": [
        { "type": "text", "value": "Our strategy for FY 2025-2026 aims to drive sustainable growth and operational excellence in motor insurance technology:" },
        { "type": "bullet", "value": [
          "Increase market share by 20% through technological innovations",
          "Reduce operational costs by 15% through automation and process optimization",
          "Enhance customer satisfaction by 30% with improved services and personalization",
          "Achieve 100% carbon neutrality in tech operations by the end of FY 2026"
        ]},
        { "type": "graph", "graphType": "bar", "data": [
          { "name": "Current Market Share", "value": 100 },
          { "name": "Target Market Share", "value": 120 },
          { "name": "Current Operational Costs", "value": 100 },
          { "name": "Target Operational Costs", "value": 85 },
          { "name": "Current Customer Satisfaction", "value": 100 },
          { "name": "Target Customer Satisfaction", "value": 130 }
        ]},
        { "type": "text", "value": "Financial Projections for FY 2025-2026:" },
        { "type": "bullet", "value": [
          "Current Revenue: $600 million",
          "Projected Revenue (20% increase): $720 million",
          "Current Operational Costs: $350 million",
          "Projected Operational Costs (15% reduction): $297.5 million",
          "Projected Profit Increase: $122.5 million"
        ]}
      ]
    },
    {
      "title": "Product Innovation and Development",
      "content": [
        { "type": "text", "value": "Introducing new technology-driven insurance products:" },
        { "type": "bullet", "value": [
          "Usage-Based Insurance (UBI) with real-time risk assessment",
          "Predictive alerts for maintenance and claim prevention",
          "Enhanced virtual insurance advisor services",
          "Automated claims processing with advanced data analytics"
        ]},
        { "type": "graph", "graphType": "bar", "data": [
          { "name": "Current Product Adoption", "value": 60 },
          { "name": "Projected Technology-Driven Product Adoption", "value": 50 }
        ]},
        { "type": "text", "value": "Projected adoption of new technology-driven products to reach 60% by Q4 2025" }
      ]
    },
    {
      "title": "AI Value in Motor Insurance",
      "content": [
        { "type": "text", "value": "Leveraging AI to drive business value:" },
        { "type": "bullet", "value": [
          "Personalized pricing models using machine learning",
          "AI-driven predictive maintenance alerts for policyholders",
          "Chatbots for 24/7 customer service",
          "Computer vision for automated damage assessment"
        ]},
        { "type": "graph", "graphType": "pie", "data": [
          { "name": "Pricing Optimization", "value": 30 },
          { "name": "Predictive Maintenance", "value": 25 },
          { "name": "Customer Service", "value": 20 },
          { "name": "Claims Assessment", "value": 25 }
        ]},
        { "type": "text", "value": "Projected AI-driven cost savings: $50 million annually" }
      ]
    },
    {
      "title": "AI Impact on Customer Experience",
      "content": [
        { "type": "text", "value": "Enhancing customer experience through AI:" },
        { "type": "bullet", "value": [
          "Reduce policy purchase time by 60% with AI-assisted processes",
          "Increase customer retention by 20% using predictive analytics",
          "Improve claims satisfaction by 30% with AI-powered fast-track claims",
          "Personalized policy recommendations based on individual driving patterns"
        ]},
        { "type": "graph", "graphType": "bar", "data": [
          { "name": "Current Policy Purchase Time", "value": 100 },
          { "name": "AI-assisted Policy Purchase Time", "value": 40 },
          { "name": "Current Customer Retention", "value": 100 },
          { "name": "AI-enhanced Customer Retention", "value": 120 },
          { "name": "Current Claims Satisfaction", "value": 100 },
          { "name": "AI-powered Claims Satisfaction", "value": 130 }
        ]}
      ]
    },
    {
      "title": "AI Responsible Use - Utility and Frequency",
      "content": [
        { "type": "text", "value": "Implementing AI responsibly across our operations:" },
        { "type": "bullet", "value": [
          "Everyday: AI-powered customer service chatbots and virtual assistants",
          "Augmentation: Risk assessment models to support underwriters",
          "Transformation: Fully automated claims processing for simple cases"
        ]},
        { "type": "graph", "graphType": "pie", "data": [
          { "name": "Everyday Use", "value": 50 },
          { "name": "Augmentation", "value": 30 },
          { "name": "Transformation", "value": 20 }
        ]},
        { "type": "text", "value": "Ensuring ethical AI use through:" },
        { "type": "bullet", "value": [
          "Regular bias audits of AI models",
          "Transparent AI decision-making processes",
          "Human oversight for critical decisions",
          "Continuous monitoring of AI performance and impact"
        ]}
      ]
    },
    {
      "title": "Implementation Roadmap and KPIs",
      "content": [
        { "type": "text", "value": "Phased plan for implementing and scaling the technology strategy:" },
        { "type": "bullet", "value": [
          "Q1-Q2 2025: Establish infrastructure and prepare data",
          "Q3 2025: Launch pilot projects and new product trials",
          "Q4 2025: Full deployment of new technology-driven operations and customer-facing solutions",
          "Q1-Q2 2026: Evaluate, optimize, and scale technology initiatives"
        ]},
        { "type": "graph", "graphType": "bar", "data": [
          { "name": "Q1-Q2 2025", "value": 25 },
          { "name": "Q3 2025", "value": 50 },
          { "name": "Q4 2025", "value": 75 },
          { "name": "Q1-Q2 2026", "value": 100 }
        ]},
        { "type": "text", "value": "Key Performance Indicators (KPIs):" },
        { "type": "bullet", "value": [
          "Model accuracy: Achieve 97% by Q4 2025",
          "Percentage of processed claims: 75% by Q2 2026",
          "Customer satisfaction with new services: Target 95% by Q2 2026",
          "Return on technology investments: Target 250% by Q4 2026"
        ]}
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 shadow-2xl rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <h2 className="text-3xl font-bold">{currentSlideData.title}</h2>
      </div>
      <div className="p-8 h-[36rem] overflow-y-auto bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm">
        {currentSlideData.content.map((item, index) => (
          <ContentRenderer key={index} item={item} />
        ))}
      </div>
      <div className="bg-gray-800 px-6 py-4 flex justify-between items-center text-white">
        <button
          onClick={prevSlide}
          className="text-white hover:text-blue-300 transition-colors duration-200 flex items-center"
        >
          <ChevronLeft className="w-6 h-6 mr-2" />
          Previous
        </button>
        <span className="text-blue-200">
          Slide {currentSlide + 1} of {slides.length}
        </span>
        <button
          onClick={nextSlide}
          className="text-white hover:text-blue-300 transition-colors duration-200 flex items-center"
        >
          Next
          <ChevronRight className="w-6 h-6 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default AdvancedPPTSlide;
</artifact>
    `,
  `
<artifact identifier="sustainable-growth-strategy" type="application/react" title="Sustainable Growth Strategy for Motor Insurance Tech Operations with AI Tech Enablement">
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ContentRenderer = ({ item }) => {
  switch (item.type) {
    case 'text':
      return <p className="text-gray-800 mb-4 text-lg">{item.value}</p>;
    case 'bullet':
      return (
        <ul className="list-disc list-inside mb-6 space-y-2">
          {item.value.map((bullet, index) => (
            <li key={index} className="text-gray-800 text-lg">{bullet}</li>
          ))}
        </ul>
      );
    case 'graph':
      if (item.graphType === 'bar') {
        return (
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={item.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="name" tick={{ fill: '#4a5568' }} />
                <YAxis tick={{ fill: '#4a5568' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="value" fill="#3182ce" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      } else if (item.graphType === 'pie') {
        const COLORS = ['#3182ce', '#38a169', '#ecc94b', '#e53e3e', '#805ad5'];

        return (
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={item.data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => name + " " + (percent * 100).toFixed(0) + "%"}
                >
                  {item.data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      }
      return null;
    case 'figure':
      return (
        <div className="mb-6">
          <img src={item.value} alt={item.caption} className="mx-auto rounded-lg shadow-md" />
          <p className="text-center text-sm text-gray-600 mt-3">{item.caption}</p>
        </div>
      );
    default:
      return null;
  }
};

const AdvancedPPTSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      "title": "Sustainable Growth Strategy for Motor Insurance Tech Operations with AI Tech Enablement",
      "content": [
        { "type": "text", "value": "Our strategy for FY 2025-2026 aims to drive sustainable growth and operational excellence in motor insurance technology:" },
        { "type": "bullet", "value": [
          "Increase market share by 20% through technological innovations",
          "Reduce operational costs by 15% through automation and process optimization",
          "Enhance customer satisfaction by 30% with improved services and personalization",
          "Achieve 100% carbon neutrality in tech operations by the end of FY 2026"
        ]},
        { "type": "graph", "graphType": "bar", "data": [
          { "name": "Current Market Share", "value": 100 },
          { "name": "Target Market Share", "value": 120 },
          { "name": "Current Operational Costs", "value": 100 },
          { "name": "Target Operational Costs", "value": 85 },
          { "name": "Current Customer Satisfaction", "value": 100 },
          { "name": "Target Customer Satisfaction", "value": 130 }
        ]},
        { "type": "text", "value": "Financial Projections for FY 2025-2026:" },
        { "type": "bullet", "value": [
          "Current Revenue: $600 million",
          "Projected Revenue (20% increase): $720 million",
          "Current Operational Costs: $350 million",
          "Projected Operational Costs (15% reduction): $297.5 million",
          "Projected Profit Increase: $122.5 million"
        ]}
      ]
    },
    {
      "title": "Product Innovation and Development",
      "content": [
        { "type": "text", "value": "Introducing new technology-driven insurance products:" },
        { "type": "bullet", "value": [
          "Usage-Based Insurance (UBI) with real-time risk assessment",
          "Predictive alerts for maintenance and claim prevention",
          "Enhanced virtual insurance advisor services",
          "Automated claims processing with advanced data analytics"
        ]},
        { "type": "graph", "graphType": "bar", "data": [
          { "name": "Current Product Adoption", "value": 60 },
          { "name": "Projected Technology-Driven Product Adoption", "value": 50 }
        ]},
        { "type": "text", "value": "Projected adoption of new technology-driven products to reach 60% by Q4 2025" }
      ]
    },
    {
      "title": "AI Value in Motor Insurance",
      "content": [
        { "type": "text", "value": "Leveraging AI to drive business value:" },
        { "type": "bullet", "value": [
          "Personalized pricing models using machine learning",
          "AI-driven predictive maintenance alerts for policyholders",
          "Chatbots for 24/7 customer service",
          "Computer vision for automated damage assessment"
        ]},
        { "type": "graph", "graphType": "pie", "data": [
          { "name": "Pricing Optimization", "value": 30 },
          { "name": "Predictive Maintenance", "value": 25 },
          { "name": "Customer Service", "value": 20 },
          { "name": "Claims Assessment", "value": 25 }
        ]},
        { "type": "text", "value": "Projected AI-driven cost savings: $50 million annually" }
      ]
    },
    {
      "title": "AI Impact on Customer Experience",
      "content": [
        { "type": "text", "value": "Enhancing customer experience through AI:" },
        { "type": "bullet", "value": [
          "Reduce policy purchase time by 60% with AI-assisted processes",
          "Increase customer retention by 20% using predictive analytics",
          "Improve claims satisfaction by 30% with AI-powered fast-track claims",
          "Personalized policy recommendations based on individual driving patterns"
        ]},
        { "type": "graph", "graphType": "bar", "data": [
          { "name": "Current Policy Purchase Time", "value": 100 },
          { "name": "AI-assisted Policy Purchase Time", "value": 40 },
          { "name": "Current Customer Retention", "value": 100 },
          { "name": "AI-enhanced Customer Retention", "value": 120 },
          { "name": "Current Claims Satisfaction", "value": 100 },
          { "name": "AI-powered Claims Satisfaction", "value": 130 }
        ]}
      ]
    },
    {
      "title": "AI Responsible Use - Utility and Frequency",
      "content": [
        { "type": "text", "value": "Implementing AI responsibly across our operations:" },
        { "type": "bullet", "value": [
          "Everyday: AI-powered customer service chatbots and virtual assistants",
          "Augmentation: Risk assessment models to support underwriters",
          "Transformation: Fully automated claims processing for simple cases"
        ]},
        { "type": "graph", "graphType": "pie", "data": [
          { "name": "Everyday Use", "value": 50 },
          { "name": "Augmentation", "value": 30 },
          { "name": "Transformation", "value": 20 }
        ]},
        { "type": "text", "value": "Ensuring ethical AI use through:" },
        { "type": "bullet", "value": [
          "Regular bias audits of AI models",
          "Transparent AI decision-making processes",
          "Human oversight for critical decisions",
          "Continuous monitoring of AI performance and impact"
        ]}
      ]
    },
  {
    "title": "AI Tech Enablement - Infrastructure",
    "content": [
      { "type": "text", "value": "Building a robust AI-ready infrastructure:" },
      { "type": "bullet", "value": [
        "Implement cloud-based AI platforms for scalability",
        "Establish data lakes for centralized, accessible data",
        "Deploy edge computing for real-time processing of telematics data",
        "Integrate IoT devices for enhanced data collection"
      ]},
      { "type": "graph", "graphType": "pie", "data": [
        { "name": "Cloud AI Platforms", "value": 40 },
        { "name": "Data Lakes", "value": 25 },
        { "name": "Edge Computing", "value": 20 },
        { "name": "IoT Integration", "value": 15 }
      ]},
      { "type": "text", "value": "Total Investment in AI Infrastructure: $30 million" }
    ]
  },
  {
    "title": "AI Tech Enablement - Talent and Tools",
    "content": [
      { "type": "text", "value": "Empowering our workforce with AI capabilities:" },
      { "type": "bullet", "value": [
        "Upskill 200 employees in AI and machine learning",
        "Recruit 50 AI specialists and data scientists",
        "Implement MLOps practices for efficient AI deployment",
        "Adopt AutoML tools for rapid model development and iteration"
      ]},
      { "type": "graph", "graphType": "bar", "data": [
        { "name": "Current AI-skilled Workforce", "value": 50 },
        { "name": "Target AI-skilled Workforce", "value": 300 },
        { "name": "Current AI Models in Production", "value": 10 },
        { "name": "Target AI Models in Production", "value": 50 }
      ]},
      { "type": "text", "value": "Key AI Tools and Platforms:" },
      { "type": "bullet", "value": [
        "TensorFlow and PyTorch for deep learning",
        "Kubernetes for AI model deployment",
        "Databricks for collaborative data science",
        "Dataiku for end-to-end machine learning lifecycle management"
      ]}
    ]
  },
    {
      "title": "Implementation Roadmap and KPIs",
      "content": [
        { "type": "text", "value": "Phased plan for implementing and scaling the technology strategy:" },
        { "type": "bullet", "value": [
          "Q1-Q2 2025: Establish infrastructure and prepare data",
          "Q3 2025: Launch pilot projects and new product trials",
          "Q4 2025: Full deployment of new technology-driven operations and customer-facing solutions",
          "Q1-Q2 2026: Evaluate, optimize, and scale technology initiatives"
        ]},
        { "type": "graph", "graphType": "bar", "data": [
          { "name": "Q1-Q2 2025", "value": 25 },
          { "name": "Q3 2025", "value": 50 },
          { "name": "Q4 2025", "value": 75 },
          { "name": "Q1-Q2 2026", "value": 100 }
        ]},
        { "type": "text", "value": "Key Performance Indicators (KPIs):" },
        { "type": "bullet", "value": [
          "Model accuracy: Achieve 97% by Q4 2025",
          "Percentage of processed claims: 75% by Q2 2026",
          "Customer satisfaction with new services: Target 95% by Q2 2026",
          "Return on technology investments: Target 250% by Q4 2026"
        ]}
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 shadow-2xl rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <h2 className="text-3xl font-bold">{currentSlideData.title}</h2>
      </div>
      <div className="p-8 h-[36rem] overflow-y-auto bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm">
        {currentSlideData.content.map((item, index) => (
          <ContentRenderer key={index} item={item} />
        ))}
      </div>
      <div className="bg-gray-800 px-6 py-4 flex justify-between items-center text-white">
        <button
          onClick={prevSlide}
          className="text-white hover:text-blue-300 transition-colors duration-200 flex items-center"
        >
          <ChevronLeft className="w-6 h-6 mr-2" />
          Previous
        </button>
        <span className="text-blue-200">
          Slide {currentSlide + 1} of {slides.length}
        </span>
        <button
          onClick={nextSlide}
          className="text-white hover:text-blue-300 transition-colors duration-200 flex items-center"
        >
          Next
          <ChevronRight className="w-6 h-6 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default AdvancedPPTSlide;
</artifact>
    `,
];
