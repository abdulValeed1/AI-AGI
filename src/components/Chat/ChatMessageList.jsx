import { ChatMessage } from "components/Chat/Message";
import { Separator } from "components/ui/separator";
import { useEffect, useState} from "react";
import TypingLoader from "./TypingLoader"

const ChatMessageList = ({
  messages,
  setCurrentArtifact,
  containerRef,
  showResult,
  selectedMsg,
  isLoading
}) => {
  
  const [isMessageLoading, setIsMesssageLoading] = useState(isLoading)
  useEffect(()=>{
    setIsMesssageLoading(isLoading)
  },[isLoading])
  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col gap-4 max-w-3xl mx-auto w-full pt-1"
    >
      {messages.map((message, index) => (
        <>
          <ChatMessage
            key={index}
            role={message.role}
            model={"claude"}
            text={message.content}
            attachments={message.experimental_attachments || []}
            setCurrentArtifact={setCurrentArtifact}
            showResult={showResult}
            helpExamples={message.examples || []}
            isLoading={isMessageLoading}
          />

          {index !== messages.length - 1 && <Separator />}
        </>
      ))}
    </div>
  );
};

export default ChatMessageList;
