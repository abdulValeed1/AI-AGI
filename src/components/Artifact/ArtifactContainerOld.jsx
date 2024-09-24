import axios from "axios";
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
import { ArtifactMessagePartData, extractSlidesJSON } from "lib/utils";
import {
  CheckIcon,
  ClipboardIcon,
  XIcon,
  ArrowRight,
  Lightbulb,
  Download,
  CheckCircle,
} from "lucide-react";
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
        checked ? "bg-blue-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
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
  handleSubChatClick,
}) => {
  const [mode, setMode] = useState("preview");
  const [slides, setSlides] = useState([])
  const navigate = useNavigate();
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    timeout: 2000,
  });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(content);
  };

  const generateAndDownloadPPT = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/generate_ppt",
        [{"slides": slides}],
        {
          responseType: "blob", // Important: This tells axios to treat the response as binary data
        }
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      });

      // Create a link element and trigger the download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "presentation.pptx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PPT:", error);
    }
  };
  useEffect(() => {
    const slideData = extractSlidesJSON(content)
    setSlides(slideData)
  }, [content])
  
  return (
    <Card className="w-full border-none rounded-none flex flex-col h-full max-h-full">
      <CardHeader className="bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-lg border rounded-b-none py-2 px-4 flex flex-row items-center gap-4 justify-between space-y-0 mb-4">
        {/* <span className="font-semibold">{title || "Generating..."}</span> */}

        <div className="w-full flex gap-2 items-center justify-between items-center p-4">
          {type &&
            artifactPreviewSupportedTypes.includes(type) &&
            !generating &&
            (isInteractive ? (
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
                <div className="px-4 py-2 bg-gray-200 rounded bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 hover:scale-105 transition duration-200">
                  {title}
                </div>
                <div
                  className="flex items-center justify-center space-x-2 bg-gray-800 text-blue-400 p-2 rounded-lg border border-blue-400 hover:bg-blue-400 hover:text-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition duration-200 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer"
                  onClick={handleSubChatClick}
                >
                  <span>Proceed to next step</span>
                  <ArrowRight size={20} />
                </div>
              </>
            ))
          }
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

      <CardFooter className="bg-gray-800 bg-opacity-30 backdrop-blur-sm border rounded-lg rounded-t-none py-2 px-4 flex items-center flex-row-reverse gap-4 justify-between">
        <Button
          onClick={onCopy}
          size="icon"
          variant="outline"
          className="w-8 h-8 bg-gray-800 bg-opacity-30 backdrop-blur-sm text-white"
        >
          {isCopied ? (
            <CheckIcon className="w-4 h-4" />
          ) : (
            <ClipboardIcon className="w-4 h-4" />
          )}
        </Button>
        <div className="flex items-center justify-center space-x-4 bg-gray-800 bg-opacity-30 backdrop-blur-sm p-4 rounded-lg shadow-md">
          <Lightbulb
            className={`w-6 h-6 ${
              isInteractive ? "text-blue-400" : "text-gray-400"
            }`}
          />
          <div className="flex items-center space-x-3 p-2 rounded-full shadow-md border border-gray-200">
            <Lightbulb
              className={`w-5 h-5 ${
                isInteractive ? "text-blue-400" : "text-gray-400"
              }`}
            />
            <span className="text-sm font-medium text-white">
              Interactive Mode
            </span>
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
