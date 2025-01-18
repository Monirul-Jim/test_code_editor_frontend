import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import {
  MdDarkMode,
  MdFullscreen,
  MdOutlineCloseFullscreen,
} from "react-icons/md";
import { CiLight } from "react-icons/ci";

const LivePreviewEditor: React.FC = () => {
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [cssCode, setCssCode] = useState<string>("");
  const [jsCode, setJsCode] = useState<string>("");
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Dark mode state

  // Function to generate the output
  const generateOutput = () => {
    const htmlContent = `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
    `;
    return htmlContent;
  };

  // Function to download a file
  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div>
      <div
        className={`min-h-screen p-6 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h1 className="text-3xl font-bold text-center">Live Preview Editor</h1>
        {/* Download buttons */}
        <div className="flex gap-4 mb-10">
          <button
            onClick={() => downloadFile("index.html", htmlCode)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
          >
            Download HTML
          </button>
          <button
            onClick={() => downloadFile("style.css", cssCode)}
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
          >
            Download CSS
          </button>
          <button
            onClick={() => downloadFile("script.js", jsCode)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded"
          >
            Download JS
          </button>
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`py-1 px-4 rounded ${
              isDarkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
          >
            {isDarkMode ? <CiLight /> : <MdDarkMode />}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left side: Editors for HTML, CSS, and JS */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium">HTML</label>
              <MonacoEditor
                height="300px"
                language="html"
                theme={isDarkMode ? "vs-dark" : "light"}
                value={htmlCode}
                onChange={(value) => setHtmlCode(value || "")}
                options={{
                  selectOnLineNumbers: true,
                  suggestOnTriggerCharacters: true,
                  quickSuggestions: true,
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">CSS</label>
              <MonacoEditor
                height="300px"
                language="css"
                theme={isDarkMode ? "vs-dark" : "light"}
                value={cssCode}
                onChange={(value) => setCssCode(value || "")}
                options={{
                  selectOnLineNumbers: true,
                  suggestOnTriggerCharacters: true,
                  quickSuggestions: true,
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">JavaScript</label>
              <MonacoEditor
                height="300px"
                language="javascript"
                theme={isDarkMode ? "vs-dark" : "light"}
                value={jsCode}
                onChange={(value) => setJsCode(value || "")}
                options={{
                  selectOnLineNumbers: true,
                  suggestOnTriggerCharacters: true,
                  quickSuggestions: true,
                }}
              />
            </div>
          </div>

          {/* Right side: Output display */}
          <div className="h-96">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-2">Output:</h2>
              <button
                onClick={() => setIsFullScreen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
              >
                <MdFullscreen />
              </button>
            </div>
            <iframe
              className="w-full h-full border-2"
              title="live-preview"
              srcDoc={generateOutput()}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>

        {/* Modal for full-screen mode */}
        {isFullScreen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative w-full h-full">
              <button
                onClick={() => setIsFullScreen(false)}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded z-10"
              >
                <MdOutlineCloseFullscreen />
              </button>
              <iframe
                className="w-full h-full "
                title="live-preview-fullscreen"
                srcDoc={generateOutput()}
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreviewEditor;
