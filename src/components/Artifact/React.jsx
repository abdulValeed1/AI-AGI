import SelectionTool from "components/SelectionTool";
import React, { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ReactRenderer from "components/renderer/ReactRenderer";


export const ReactArtifact = ({ code, mode, recording, onCapture }) => {
  const contentRef = useRef(null);
  const iframeRef = useRef(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleRender = () => {
    if (!iframeRef.current?.contentWindow) return;

    iframeRef.current?.contentWindow?.postMessage(
      {
        type: "UPDATE_COMPONENT",
        code,
      },
      "*"
    );
  };

  const handleSendCaptureMessage = (
    selection
  ) => {
    if (!iframeRef.current?.contentWindow) return;

    iframeRef.current?.contentWindow?.postMessage(
      {
        type: "CAPTURE_SELECTION",
        selection,
      },
      "*"
    );
  };

  const handleMessage = (event) => {
    if (event?.data?.type === "INIT_COMPLETE") {
      setIframeLoaded(true);
      handleRender();
    } else if (event?.data?.type === "SELECTION_DATA") {
      onCapture({
        selectionImg: event.data.data.selectionImg,
        artifactImg: event.data.data.artifactImg,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    handleRender();
  }, [code]);

  if (mode === "preview") {
    return (
      <>
        <div ref={contentRef} className="w-full h-full">
          <ReactRenderer code={code}/>
        </div>

        {recording && iframeLoaded && (
          <SelectionTool
            targetRef={contentRef}
            onSelect={handleSendCaptureMessage}
          />
        )}
      </>
    );
  }

  return (
    <SyntaxHighlighter
      language="tsx"
      style={oneDark}
      customStyle={{
        margin: 0,
        borderRadius: 0,
        width: "100%",
        overflow: "auto",
        height: "100%",
        maxHeight: "100%",
      }}
      codeTagProps={{
        style: {
          fontSize: "0.9rem",
          fontFamily: "var(--font-inter)",
        },
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};
