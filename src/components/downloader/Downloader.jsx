import React from 'react';
import { Download, CheckCircle } from 'lucide-react';
import PPT from "./dummy_ppt.pptx"
const Downloader = () => {

  return (
    <div className="w-full bg-white rounded-lg shadow-xl">
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg shadow-lg overflow-hidden">
        <div className="p-8 text-white">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white rounded-full p-3">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center mb-2">Ready to Download!</h2>
          <p className="text-center mb-8 opacity-90">Your PowerPoint presentation is now available.</p>
          <div className="flex justify-center">
            <a
              href={PPT}
              download
              className="flex items-center justify-center px-6 py-3 bg-white text-purple-600 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-opacity-90 hover:shadow-md"
            >
              <Download className="h-5 w-5 mr-2" />
              Download PPT
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Downloader;