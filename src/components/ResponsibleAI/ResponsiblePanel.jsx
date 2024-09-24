import React from "react";
import Wizards from "components/Wizard/Wizards"

function NewPanel() {

  return (
    <>
      <div
        className="relative flex w-full flex-1 overflow-x-hidden overflow-y-scroll pt-6 bg-gray-800 bg-opacity-30 rounded-lg p-4 backdrop-blur-sm"
      >
        <Wizards/>
      </div>
    </>
  );
}

export default NewPanel;
