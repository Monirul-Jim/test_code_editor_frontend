import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";

const LivePreviewEditor: React.FC = () => {
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [cssCode, setCssCode] = useState<string>("");
  const [jsCode, setJsCode] = useState<string>("");

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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Live Preview Editor
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side: Editors for HTML, CSS, and JS */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200">
              HTML
            </label>
            <MonacoEditor
              height="300px"
              language="html"
              theme="vs-dark"
              value={htmlCode}
              onChange={(value) => setHtmlCode(value || "")}
              options={{
                selectOnLineNumbers: true,
                autoClosingBrackets: true,
                suggestOnTriggerCharacters: true,
                quickSuggestions: true,
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">
              CSS
            </label>
            <MonacoEditor
              height="300px"
              language="css"
              theme="vs-dark"
              value={cssCode}
              onChange={(value) => setCssCode(value || "")}
              options={{
                selectOnLineNumbers: true,
                autoClosingBrackets: true,
                suggestOnTriggerCharacters: true,
                quickSuggestions: true,
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">
              JavaScript
            </label>
            <MonacoEditor
              height="300px"
              language="javascript"
              theme="vs-dark"
              value={jsCode}
              onChange={(value) => setJsCode(value || "")}
              options={{
                selectOnLineNumbers: true,
                autoClosingBrackets: true,
                suggestOnTriggerCharacters: true,
                quickSuggestions: true,
              }}
            />
          </div>
        </div>

        {/* Right side: Output display */}
        <div className="h-96">
          <h2 className="text-xl font-bold mb-2">Output:</h2>
          <iframe
            className="w-full h-full border-2 border-gray-700"
            title="live-preview"
            srcDoc={generateOutput()}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
};

export default LivePreviewEditor;
