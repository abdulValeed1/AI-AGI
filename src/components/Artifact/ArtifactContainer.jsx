import axios from 'axios';
import { ReactArtifact } from "components/Artifact/React";
import { CodeBlock } from "components/Markdown/CodeBlock";
import Markdown from "components/Markdown/Markdown";
import SelectionTool from "components/SelectionTool";
import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "components/ui/tabs";
import { useCopyToClipboard } from "lib/hooks/useCopyToClipboard";
import { ArtifactMessagePartData } from "lib/utils";
import { CheckIcon, ClipboardIcon, XIcon, ArrowRight, Lightbulb, Download, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Props as ReactArtifactProps } from "components/Artifact/React";
import { HTMLArtifact } from "components/Artifact/Html";
import { useNavigate } from "react-router-dom";

const artifactPreviewSupportedTypes = ["text/html", "application/react"];

const Switch = ({ checked, onCheckedChange }) => {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        checked ? 'bg-blue-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export const ArtifactContainer = ({
  type,
  title,
  language,
  content,
  onClose,
  recording,
  onCapture,
  generating,
  isInteractive,
  handleInteractive,
  handleSubChatClick
}) => {
  const [mode, setMode] = useState("preview");
  const navigate = useNavigate();
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    timeout: 2000,
  });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(content);
  };


  const slides = {"slides":[
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
  ]};
  
  const generateAndDownloadPPT = async () => {
    try {
      const response = await axios.post('http://localhost:8000/generate_ppt', slides, {
        responseType: 'blob', // Important: This tells axios to treat the response as binary data
      });
      
      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
      
      // Create a link element and trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'presentation.pptx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating PPT:', error);
    }
  };

  return (
    <Card className="w-full border-none rounded-none flex flex-col h-full max-h-full">
      <CardHeader className="bg-slate-50 rounded-lg border rounded-b-none py-2 px-4 flex flex-row items-center gap-4 justify-between space-y-0 mb-4">
        {/* <span className="font-semibold">{title || "Generating..."}</span> */}

        <div className="w-full flex gap-2 items-center justify-between items-center p-4">
          {type &&
            artifactPreviewSupportedTypes.includes(type) &&
            !generating && (
              isInteractive ? (
                <>
                  <button
                    className={`px-4 py-2 rounded font-medium transition-all duration-300 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/finish");
                    }}
                  >
                    <CheckCircle size={18} />
                    <span>Finish & Download</span>
                  </button>
                  <button
                    className={`px-4 py-2 rounded font-medium transition-all duration-300 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg`}
                    onClick={generateAndDownloadPPT}
                  >
                    <Download size={18} />
                    <span>Download</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="px-4 py-2 bg-gray-200 rounded">{title}</div>
                  <div 
                    className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300 shadow-md hover:shadow-lg"
                    onClick={handleSubChatClick}
                  >
                    <span>Proceed to next step</span>
                    <ArrowRight size={20} />
                  </div>
                </>
              )

              // <Tabs value={mode} onValueChange={(value) => setMode(value)}>
              //   <TabsList>
              //     {/* <TabsTrigger className="bg-slate-200" alue="preview">Preview</TabsTrigger> */}
              //     {/* <TabsTrigger value="code">Code</TabsTrigger> */}
              //   </TabsList>
              // </Tabs>
            )}

          {/* <Button onClick={onClose} size="icon" variant="ghost">
            <XIcon className="w-4 h-4" />
          </Button> */}
        </div>
      </CardHeader>

      <CardContent
        id="artifact-content"
        className="border-l border-r p-4 w-full flex-1 max-h-full overflow-hidden relative"
      >
        {type === "text/markdown" && (
          <Markdown
            text={content}
            className="h-full max-h-full overflow-auto py-4 px-4"
          />
        )}

        {type === "application/code" && language && (
          <CodeBlock
            language={language}
            value={content}
            showHeader={false}
            className="h-full max-h-full overflow-auto"
          />
        )}

        {type === "application/react" && (
          <ReactArtifact
            code={content}
            mode={mode}
            recording={false}
            onCapture={onCapture}
          />
        )}

        {type === "text/html" && (
          <HTMLArtifact
            code={content}
            mode={mode}
            recording={false}
            onCapture={onCapture}
          />
        )}
      </CardContent>

      <CardFooter className="bg-slate-50 border rounded-lg rounded-t-none py-2 px-4 flex items-center flex-row-reverse gap-4 justify-between">
        <Button
          onClick={onCopy}
          size="icon"
          variant="outline"
          className="w-8 h-8"
        >
          {isCopied ? (
            <CheckIcon className="w-4 h-4" />
          ) : (
            <ClipboardIcon className="w-4 h-4" />
          )}
        </Button>
        <div className="flex items-center justify-center space-x-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg shadow-md">
      <Lightbulb 
        className={`w-6 h-6 ${isInteractive ? 'text-yellow-400' : 'text-gray-400'}`} 
      />
      <div className="flex items-center space-x-3 bg-white p-2 rounded-full shadow-md border border-gray-200">
        <Lightbulb 
          className={`w-5 h-5 ${isInteractive ? 'text-yellow-400' : 'text-gray-400'}`} 
        />
        <span className="text-sm font-medium text-gray-700">Interactive Mode</span>
        <Switch
          checked={isInteractive}
          onCheckedChange={handleInteractive}
          className="data-[state=checked]:bg-blue-500"
        />
      </div>
    </div>
      </CardFooter>
    </Card>
  );
};
