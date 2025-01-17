// import React, { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useSubmitCodeMutation } from "./redux/api/submitApi";
// import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "./constant/constant";

// // Define a type for supported languages
// type SupportedLanguage = keyof typeof CODE_SNIPPETS;

// interface FormData {
//   language: SupportedLanguage; // Use SupportedLanguage here
//   code: string;
// }

// const App: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm<FormData>();

//   const [submitCode, { isLoading }] = useSubmitCodeMutation();
//   const [output, setOutput] = useState<string | null>(null);

//   // State to manage the initial code snippet for each language
//   const [selectedLanguage, setSelectedLanguage] = useState<
//     SupportedLanguage | ""
//   >("");

//   // Update the code textarea when a new language is selected
//   const handleLanguageChange = (language: SupportedLanguage) => {
//     setSelectedLanguage(language);
//     // Set the code field with the corresponding code snippet based on the selected language
//     if (CODE_SNIPPETS[language]) {
//       setValue("code", CODE_SNIPPETS[language]); // This will update the code in the form
//     }
//   };

//   const onSubmit: SubmitHandler<FormData> = async (data) => {
//     try {
//       console.log("Submitting code:", {
//         code: data.code,
//         language: data.language,
//         version: LANGUAGE_VERSIONS[data.language],
//       });

//       const result = await submitCode({
//         code: data.code,
//         language: data.language,
//       }).unwrap();

//       console.log("API Response:", result);

//       // Set output based on the response
//       if (result.run?.stdout) {
//         setOutput(result.run.stdout); // Display standard output
//       } else if (result.run?.stderr) {
//         setOutput(result.run.stderr); // Display error messages
//       } else {
//         setOutput("Execution completed but no output was returned.");
//       }
//     } catch (err) {
//       setOutput(null); // Clear previous output if there's an error
//       console.error("Error during code submission:", err);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-bold text-center mb-4">
//         Online Code Editor
//       </h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Code Input */}
//         <div>
//           <label
//             htmlFor="code"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Code
//           </label>
//           <textarea
//             id="code"
//             {...register("code", { required: "Code is required" })}
//             className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             rows={10}
//             placeholder="Write your code here..."
//           />
//           {errors.code && (
//             <p className="text-red-500 text-xs mt-1">{errors.code.message}</p>
//           )}
//         </div>

//         {/* Language Input */}
//         <div>
//           <label
//             htmlFor="language"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Language
//           </label>
//           <select
//             id="language"
//             {...register("language", { required: "Please select a language" })}
//             className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             onChange={(e) =>
//               handleLanguageChange(e.target.value as SupportedLanguage)
//             } // Cast to SupportedLanguage
//           >
//             <option value="">Select language</option>
//             <option value="javascript">JavaScript</option>
//             <option value="typescript">TypeScript</option>
//             <option value="python">Python</option>
//             <option value="java">Java</option>
//             <option value="csharp">C#</option>
//             <option value="php">PHP</option>
//           </select>

//           {errors.language && (
//             <p className="text-red-500 text-xs mt-1">
//               {errors.language.message}
//             </p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <div>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {isLoading ? "Submitting..." : "Submit Code"}
//           </button>
//         </div>
//       </form>

//       {/* Display Output */}
//       {output && (
//         <div className="mt-6 p-4 border border-gray-300 rounded-md">
//           <h2 className="text-xl font-bold">Output:</h2>
//           <pre className="mt-2 whitespace-pre-wrap break-words">{output}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSubmitCodeMutation } from "./redux/api/submitApi";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "./constant/constant";

// Define a type for supported languages
type SupportedLanguage = keyof typeof CODE_SNIPPETS;

interface FormData {
  language: SupportedLanguage; // Use SupportedLanguage here
  code: string;
}

const App: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const [submitCode, { isLoading }] = useSubmitCodeMutation();
  const [output, setOutput] = useState<string | null>(null);

  // State to manage the initial code snippet for each language
  const [selectedLanguage, setSelectedLanguage] = useState<
    SupportedLanguage | ""
  >("");

  // Update the code textarea when a new language is selected
  const handleLanguageChange = (language: SupportedLanguage) => {
    setSelectedLanguage(language);
    // Set the code field with the corresponding code snippet based on the selected language
    if (CODE_SNIPPETS[language]) {
      setValue("code", CODE_SNIPPETS[language]); // This will update the code in the form
    }
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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Online Code Editor
        </h1>

        {/* Language Selection */}
        <div className="mb-4">
          <label
            htmlFor="language"
            className="block text-lg font-medium text-gray-200"
          >
            Select Language
          </label>
          <select
            id="language"
            {...register("language", { required: "Please select a language" })}
            className="mt-1 block w-full p-3 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                className="block text-sm font-medium text-gray-200"
              >
                Code
              </label>
              <textarea
                id="code"
                {...register("code", { required: "Code is required" })}
                className="mt-1 block w-full p-3 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows={10}
                placeholder="Write your code here..."
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
              <div className="p-4   ">
                <pre className="whitespace-pre-wrap break-words">{output}</pre>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
