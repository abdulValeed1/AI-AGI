import React, { useState, useRef, useEffect } from "react";
import ArtifactPanel from "components/Artifact/Index";
import { ChatInput } from "components/Chat/ChatInput";
import ChatMessageList from "components/Chat/ChatMessageList";
import { useScrollAnchor } from "lib/hooks/useScrollAnchor";
import { autoResponse } from "lib/autoResponse";
import Suggestions from "./Suggestions";
import Result from "components/Results/Result";


function NewPanel() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentArtifact, setCurrentArtifact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMsg, SetSelectedMsg] = useState([]);
  const [showInput, setShowInput] = useState(true);
  const [showResult, setShowResult] = useState(false)
  const { messagesRef, scrollRef, showScrollButton, handleManualScroll } =
    useScrollAnchor(messages);

  const handleUserSend = () => {
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
  };

  const handleShowresult = (value) => {
    setShowResult(value)
  }

  const handleShowInput = (value) => {
    setShowInput(value)
  }

  useEffect(() => {
    if (selectedMsg.length) {
      setIsLoading(true);
      setTimeout(() => {
        const botMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: selectedMsg[selectedMsg.length - 1].question,
          examples: selectedMsg[selectedMsg.length - 1].examples,
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
    }
  }, [selectedMsg.length]);

  useEffect(() => {
    if (messages.length === 6) {
      setShowInput(false);
      setIsLoading(true);
      setTimeout(() => {
        const botMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: autoResponse[0],
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
    }
  }, [messages.length]);

  return (
    <>
      <div
        className="relative flex w-full flex-1 overflow-x-hidden overflow-y-scroll pt-6 bg-gray-800 bg-opacity-30 rounded-lg p-4 backdrop-blur-sm"
        ref={scrollRef}
      >
        {!showResult ? (
          <div className="relative mx-auto flex h-full w-full min-w-[400px] max-w-2xl flex-1 flex-col md:px-2">
            <div className="p-4 mb-4 text-white">
              <h2 className="text-xl font-bold mb-2">Optimize Your Results</h2>
              <p className="mb-2">
                For the best outcomes, please select all linked values one by
                one. This approach ensures comprehensive and tailored results.
                If time is limited, focus on items marked as "Recommended" for a
                balanced experience. Remember, the more selections you make, the
                more accurate your results will be. Your choices matter – take
                the time to select wisely!
              </p>
            </div>
            <Suggestions SetSelectedMsg={SetSelectedMsg} />
            <ChatMessageList
              messages={messages}
              setCurrentArtifact={setCurrentArtifact}
              containerRef={messagesRef}
              showResult={showResult}
              selectedMsg={selectedMsg}
              isLoading={isLoading}
            />
            <ChatInput
              input={input}
              setInput={setInput}
              onSubmit={handleUserSend}
              isLoading={isLoading}
              attachments={[]}
              onAddAttachment={() => {}}
              onRemoveAttachment={() => {}}
              showScrollButton={showScrollButton}
              handleManualScroll={handleManualScroll}
              stopGenerating={() => {}}
              showInput={showInput}
              handleShowInput={handleShowInput}
              handleShowResult={handleShowresult}
            />
          </div>
        ) : (
          currentArtifact && (
            // <ArtifactPanel
            //   title={currentArtifact.title}
            //   id={currentArtifact.id}
            //   type={currentArtifact.type}
            //   generating={currentArtifact.generating}
            //   content={currentArtifact.content}
            //   language={currentArtifact.language}
            //   onClose={() => setCurrentArtifact(null)}
            //   onCapture={() => {}}
            //   showResult={showResult}
            //   handleShowresult={handleShowresult}
            //   handleSubChatClick={() => {}}
            // />
            <Result step={1}/>
          )
        )}
      </div>
    </>
  );
}

export default NewPanel;
