import React, { useEffect } from 'react'
import { ArtifactContainer } from './ArtifactContainer'

function ArtifactPanel({title, id, type, generating,content,language, onClose, onCapture, showResult, handleShowresult, handleSubChatClick}) {
    return (
    <>
    {!showResult ? (
      <div className="w-full max-w-3xl h-full max-h-full pt-6 pb-4">
        <ArtifactContainer
            title={title}
            id={id}
            type={type}
            generating={generating}
            content={content}
            language={language}
            onClose={onClose}
            onCapture={onCapture}
            showResult={showResult}
            handleShowresult={handleShowresult}
            handleSubChatClick={handleSubChatClick}
        />
      </div>
    ) : (
      <div className="flex justify-center items-center w-screen h-screen">
         <div id="panel-head" className="w-full max-w-full h-full max-h-full pt-6 pb-4 mb-4">
            <ArtifactContainer
                title={title}
                id={id}
                type={type}
                generating={generating}
                content={content}
                language={language}
                onClose={onClose}
                onCapture={onCapture}
                showResult={showResult}
                handleShowresult={handleShowresult}
                handleSubChatClick={handleSubChatClick}
            />
          </div>
      </div>
    )}
  </>
  )
}

export default ArtifactPanel