import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSubmitCodeMutation } from "./redux/api/submitApi";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "./constant/constant";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

// Define a type for supported languages
type SupportedLanguage = keyof typeof CODE_SNIPPETS;

interface FormData {
  language: SupportedLanguage;
  code: string;
}

const Home: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const [submitCode, { isLoading }] = useSubmitCodeMutation();
  const [output, setOutput] = useState<string | null>(null);

  // State to manage the initial code snippet for each language
  const [selectedLanguage, setSelectedLanguage] = useState<
    SupportedLanguage | ""
  >("");

  useEffect(() => {
    // Set initial code snippet when a new language is selected
    if (selectedLanguage && CODE_SNIPPETS[selectedLanguage]) {
      setValue("code", CODE_SNIPPETS[selectedLanguage]);
    }
  }, [selectedLanguage, setValue]);

  // Update the code field when a new language is selected
  const handleLanguageChange = (language: SupportedLanguage) => {
    setSelectedLanguage(language);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log("Submitting code:", {
        code: data.code,
        language: data.language,
        version: LANGUAGE_VERSIONS[data.language],
      });

      const result = await submitCode({
        code: data.code,
        language: data.language,
      }).unwrap();

      console.log("API Response:", result);

      // Set output based on the response
      if (result.run?.stdout) {
        setOutput(result.run.stdout); // Display standard output
      } else if (result.run?.stderr) {
        setOutput(result.run.stderr); // Display error messages
      } else {
        setOutput("Execution completed but no output was returned.");
      }
    } catch (err) {
      setOutput(null); // Clear previous output if there's an error
      console.error("Error during code submission:", err);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Online Code Editor
        </h1>

        {/* Language Selection */}
        <div className="mb-4">
          <label
            htmlFor="language"
            className={`block text-lg font-medium ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Select Language
          </label>
          <select
            id="language"
            {...register("language", { required: "Please select a language" })}
            className={`mt-1 block w-full p-3 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-gray-200 border-gray-300 text-gray-900"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500`}
            onChange={(e) =>
              handleLanguageChange(e.target.value as SupportedLanguage)
            }
          >
            <option value="">Select language</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
            <option value="php">PHP</option>
          </select>
          {errors.language && (
            <p className="text-red-500 text-xs mt-1">
              {errors.language.message}
            </p>
          )}
        </div>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`py-1 px-4 rounded ${
            isDarkMode
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          }`}
        >
          {isDarkMode ? <CiLight size={20} /> : <MdDarkMode size={20} />}
        </button>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Left side: Code Editor */}
          <div className="space-y-4">
            {/* Code Input */}
            <div>
              <label
                htmlFor="code"
                className={`block text-sm font-medium ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Code
              </label>
              <MonacoEditor
                height="400px"
                language={selectedLanguage || "javascript"} // Dynamically set language
                theme={isDarkMode ? "vs-dark" : "light"}
                value={CODE_SNIPPETS[selectedLanguage as SupportedLanguage]}
                onChange={(value) => setValue("code", value || "")} // Update form code value on change
                options={{
                  selectOnLineNumbers: true,
                  autoClosingBrackets: "languageDefined",
                  suggestOnTriggerCharacters: true, // Enable autocompletion
                  quickSuggestions: true, // Auto-suggestions for functions
                  parameterHints: { enabled: true }, // Function parameter hints
                }}
              />
              {errors.code && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.code.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isLoading ? "Submitting..." : "Submit Code"}
              </button>
            </div>
          </div>

          {/* Right side: Output Display */}
          <div>
            <h2 className="text-xl font-bold mb-2">Output:</h2>
            {output && (
              <div className="">
                <pre
                  className={`whitespace-pre-wrap break-words ${
                    isDarkMode
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-gray-900"
                  } p-4 rounded-md`}
                >
                  {output}
                </pre>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
