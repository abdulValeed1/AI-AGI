import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArtifactPanel from "components/Artifact/Index";
import { ChatInput } from "components/Chat/ChatInput";
import ChatMessageList from "components/Chat/ChatMessageList";
import { useScrollAnchor } from "lib/hooks/useScrollAnchor";
import { PPTResponse } from "lib/PPTResponse";
import { autoResponse } from "lib/autoResponse";
import Suggestions from "./Suggestions";

const Panel = ({ id }) => {
  // State management
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(id);
  const [currentArtifact, setCurrentArtifact] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [selectedArtifacts, setSelectedArtifacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMsg, SetSelectedMsg] = useState([]);
  const [showInput, setShowInput] = useState(true);
  const responseIndexRef = useRef(0);
  const autoResponseIndexRef = useRef(-1);
  
  const generatingResponse = () => {
    setIsLoading(true);
  };
  const stopGenerating = () => {
    setIsLoading(false);
  };
  const [isInteractive, setIsInteractive] = useState(true);
  const [selectedSubchats, setSelectedSubchats] = useState([]);
  // Scroll as new messages are added
  const { messagesRef, scrollRef, showScrollButton, handleManualScroll } =
    useScrollAnchor(messages);

  // Handle artifact capture
  const handleCapture = ({ selectionImg, artifactImg }) => {
    setAttachments((prev) => [
      ...prev,
      {
        contentType: "image/png",
        url: selectionImg,
      },
    ]);

    setSelectedArtifacts((prev) => {
      if (prev.includes(artifactImg)) return prev;
      return [...prev, artifactImg];
    });
  };

  // Handle attachment management
  const handleAddAttachment = (newAttachments) => {
    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const handleRemoveAttachment = (attachment) => {
    setAttachments((prev) =>
      prev.filter((item) => item.url !== attachment.url)
    );
  };

  const handleInteractive = (value) => {
    setIsInteractive(value);
  };
  const generateSequentialResponse = () => {
    const response = PPTResponse[responseIndexRef.current];
    responseIndexRef.current =
      (responseIndexRef.current + 1) % PPTResponse.length;
    return response;
  };
  const handleShowInput = (value) => {
    setShowInput(value)
  }
  const generateSequentialAutoResponse = () => {
    const paths = [
      "/chat/linked-ai-value",
      "/chat/ai-responsible-use",
      "/chat/ai-tech-enablement",
    ];

    const response = autoResponse[0];
    navigate(paths[autoResponseIndexRef.current]);
    autoResponseIndexRef.current =
      (autoResponseIndexRef.current + 1) % autoResponse.length;
    return response;
  };

  // const handleSend = async (index) => {
  //   if (isInteractive && !input.trim()) return;
  //   if (!isInteractive) {
  //     setSelectedSubchats((prev) => {
  //       if (prev.includes(index)) {
  //         return prev; // If already selected, do nothing
  //       }
  //       return [...prev, index]; // Add the new selection
  //     });
  //   } else {
  //     const userMessage = {
  //       id: Date.now().toString(),
  //       role: "user",
  //       content: input,
  //     };

  //     setMessages((prev) => [...prev, userMessage]);
  //     setInput("");
  //     setAttachments([]);
  //     setSelectedArtifacts([]);
  //   }

  //   setIsLoading(true);
  //   setTimeout(() => {
  //     const botMessage = {
  //       id: (Date.now() + 1).toString(),
  //       role: "assistant",
  //       content: !isInteractive
  //         ? generateSequentialAutoResponse()
  //         : generateSequentialResponse(),
  //     };
  //     setMessages((prev) => [...prev, botMessage]);
  //     setIsLoading(false);
  //   }, 2000);
  // };
  const handleUserSend = () => {
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setAttachments([]);
    setSelectedArtifacts([]);
  }

  // useEffect(() => {
  //   if (autoResponseIndexRef.current == 0) {
  //     setIsLoading(true);
  //     setTimeout(() => {
  //       const botMessage = {
  //         id: (Date.now() + 1).toString(),
  //         role: "assistant",
  //         content: generateSequentialAutoResponse(),
  //       };
  //       setMessages((prev) => [...prev, botMessage]);
  //       setIsLoading(false);
  //     }, 1000);
  //   }
  //   return () => {
  //     autoResponseIndexRef.current = autoResponseIndexRef.current + 1;
  //   };
  // }, []);

  useEffect(()=>{
    if(selectedMsg.length){
      setTimeout(() => {
        const botMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: selectedMsg[selectedMsg.length-1].question,
          examples: selectedMsg[selectedMsg.length-1].examples
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
    }
  },[selectedMsg.length])
  useEffect(()=>{
    if(messages.length === 6){
      setShowInput(false);
      setIsLoading(true);
        setTimeout(() => {
          const botMessage = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content:autoResponse[0],
          };
          setMessages((prev) => [...prev, botMessage]);
          setIsLoading(false);
        }, 1000);
    }
  },[messages.length])

  return (
    <>
      <div
        className="relative flex w-full flex-1 overflow-x-hidden overflow-y-scroll pt-6 bg-gray-800 bg-opacity-30 rounded-lg p-4 backdrop-blur-sm"
        ref={scrollRef}
      > 
        
        {isInteractive ? <div className="relative mx-auto flex h-full w-full min-w-[400px] max-w-2xl flex-1 flex-col md:px-2">
          <div className="p-4 mb-4 text-white">
              <h2 className="text-xl font-bold mb-2">Optimize Your Results</h2>
              <p className="mb-2">
                For the best outcomes, please select all linked values one by one. This approach ensures comprehensive and tailored results. If time is limited, focus on items marked as "Recommended" for a balanced experience. Remember, the more selections you make, the more accurate your results will be. Your choices matter – take the time to select wisely!
              </p>
            </div>
          <Suggestions SetSelectedMsg={SetSelectedMsg}/>
          <ChatMessageList
            messages={messages}
            setCurrentArtifact={setCurrentArtifact}
            containerRef={messagesRef}
            isInteractive={isInteractive}
            selectedMsg={selectedMsg}
          />
            <ChatInput
              input={input}
              setInput={setInput}
              onSubmit={handleUserSend}
              isLoading={isLoading}
              attachments={attachments}
              onAddAttachment={handleAddAttachment}
              onRemoveAttachment={handleRemoveAttachment}
              showScrollButton={showScrollButton}
              handleManualScroll={handleManualScroll}
              stopGenerating={stopGenerating}
              showInput={showInput}
              handleShowInput={handleShowInput}
              handleShowResult={handleInteractive}
            />
          
        </div> : 
        currentArtifact && (
        <ArtifactPanel
          title={currentArtifact.title}
          id={currentArtifact.id}
          type={currentArtifact.type}
          generating={currentArtifact.generating}
          content={currentArtifact.content}
          language={currentArtifact.language}
          onClose={() => setCurrentArtifact(null)}
          onCapture={handleCapture}
          isInteractive={isInteractive}
          handleInteractive={handleInteractive}
          handleSubChatClick={()=>{}}
        />
      )}
      </div>
      {/* {currentArtifact && (
        <ArtifactPanel
          title={currentArtifact.title}
          id={currentArtifact.id}
          type={currentArtifact.type}
          generating={currentArtifact.generating}
          content={currentArtifact.content}
          language={currentArtifact.language}
          onClose={() => setCurrentArtifact(null)}
          onCapture={handleCapture}
          isInteractive={isInteractive}
          handleInteractive={handleInteractive}
          handleSubChatClick={()=>{}}
        />
      )} */}
    </>
  );
};

export default Panel;
