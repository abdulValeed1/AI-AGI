import React, { useState, useEffect, useRef } from "react";
import { getReactComponentFromCode } from "lib/rendererUtils";
import html2canvas from "html2canvas";

export default function ReactRenderer({ code: initialCode, onSelectionCapture }) {
  const [code, setCode] = useState(initialCode);
  const [Component, setComponent] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    if (code) {
      try {
        const newComponent = getReactComponentFromCode(code);
        if (newComponent) {
          setComponent(() => newComponent);
        } else {
          console.error("No valid React component found in the provided code");
        }
      } catch (error) {
        console.error("Error evaluating component code:", error);
      }
    }
  }, [code]);

  const handleCaptureSelection = async ({ x, y, width, height }) => {
    if (!contentRef.current) return;

    const [selectionCanvas, artifactCanvas] = await Promise.all([
      html2canvas(contentRef.current, {
        x, y, width, height,
        logging: false,
        useCORS: true,
      }),
      html2canvas(contentRef.current),
    ]);

    const selectionImg = selectionCanvas.toDataURL("image/png");
    const artifactImg = artifactCanvas.toDataURL("image/png");

    onSelectionCapture({ selectionImg, artifactImg });
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event?.data?.type === "CAPTURE_SELECTION") {
        handleCaptureSelection(event.data.selection);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div ref={contentRef}>
      {Component ? React.createElement(Component) : null}
    </div>
  );
}