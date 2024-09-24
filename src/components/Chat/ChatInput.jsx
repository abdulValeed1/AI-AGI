import { useEffect, useRef, useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CircleStopIcon,
  PaperclipIcon,
} from "lucide-react";
import Textarea from "react-textarea-autosize";
import { Button } from "components/ui/button";
import { useEnterSubmit } from "lib/hooks/useEnterSubmit";
import AttachmentPreviewButton from "components/Chat/AttachmentPreviewButton";
import { convertFileToBase64 } from "lib/utils";

const Handlers = ({handleShowInput, handleShowResult}) => {
  return(
    <div className="p-4 flex rounded-md justify-center bg-transparent space-x-4 border border-white mb-2 ">
          <button 
            onClick={()=>handleShowInput(true)}
            className="px-4 py-2 rounded-lg border border-white bg-transparent text-white hover:bg-white hover:text-indigo-600 transition-colors duration-300"
          >
            Add more value
          </button>
          <button 
            onClick={() => {handleShowResult(true)}}
            className="px-4 py-2 rounded-lg border border-white bg-transparent text-white hover:bg-white hover:text-indigo-600 transition-colors duration-300"
          >
            Go to the result
          </button>
        </div>
  );
}

export const ChatInput = ({
  input,
  setInput,
  onSubmit,
  isLoading,
  attachments,
  onRemoveAttachment,
  onAddAttachment,
  showScrollButton,
  handleManualScroll,
  stopGenerating,
  showInput,
  handleShowInput,
  handleShowResult
}) => {
  const inputRef = useRef(null);
  const { onKeyDown } = useEnterSubmit({ onSubmit });
  const fileInputRef = useRef(null);

  // Handle file upload button click
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection and conversion to base64
  const handleFileChange = async (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newAttachments = await Promise.all(
        filesArray.map(async (file) => ({
          url: await convertFileToBase64(file),
          name: file.name,
          contentType: file.type,
        }))
      );
      onAddAttachment(newAttachments);
    }
  };

  // Focus on input field when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="sticky bottom-0 mx-auto w-full pt-6 flex flex-col gap-4 items-center">
      {showScrollButton && (
        <Button
          onClick={handleManualScroll}
          variant="outline"
          size="icon"
          className="rounded-full shadow-lg w-8 h-8"
        >
          <ArrowDownIcon className="h-4 w-4" />
        </Button>
      )}

      <div className="w-full flex flex-col gap-1 p-2.5 pl-4 rounded-md bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg border border-white border-opacity-20 rounded-b-none shadow-md">
        {/* Attachment preview */}
        {showInput ? <>
        {attachments && (
          <div className="flex items-center gap-2 mb-2">
            {attachments.map((attachment, index) => (
              <AttachmentPreviewButton
                key={index}
                value={attachment}
                onRemove={onRemoveAttachment}
              />
            ))}
          </div>
        )}

        <div className="flex gap-2 items-start">
          {/* Main input textarea */}
          <Textarea
            ref={inputRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            placeholder="Send a message."
            className="min-h-15 max-h-96 overflow-auto w-full bg-transparent border-none resize-none focus-within:outline-none text-white"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            name="message"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {/* File upload button */}
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 bg-transparent text-white"
            onClick={handleFileUpload}
          >
            <PaperclipIcon className="w-4 h-4" />
          </Button>

          {/* Submit button */}
          <Button
            variant="outline"
            onClick={isLoading ? stopGenerating : onSubmit}
            size="icon"
            className="w-8 h-8 bg-transparent text-white"
          >
            {isLoading ? (
              <CircleStopIcon className="w-4 h-4" />
            ) : (
              <ArrowUpIcon className="w-4 h-4" />
            )}
          </Button>
        </div>
        </> : <Handlers handleShowInput={handleShowInput} handleShowResult={handleShowResult}/> }
        {/*  */}
      </div>
    </div>
  );
};
