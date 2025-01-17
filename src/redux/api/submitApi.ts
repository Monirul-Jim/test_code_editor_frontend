import { LANGUAGE_VERSIONS } from "../../constant/constant";
import { baseApi } from "./baseApi";

// Define a type for supported languages
type SupportedLanguage = keyof typeof LANGUAGE_VERSIONS;

// Extend the userInfo type
interface UserInfo {
  language: SupportedLanguage; // Restrict to valid keys of LANGUAGE_VERSIONS
  code: string;
}

// Define submitApi to include version in the body
const submitApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitCode: builder.mutation({
      query: (userInfo: UserInfo) => {
        // Get the language version from the LANGUAGE_VERSIONS object
        const version = LANGUAGE_VERSIONS[userInfo.language];

        return {
          url: "/execute",
          method: "POST",
          body: {
            language: userInfo.language,
            version: version, // Pass the version correctly
            files: [
              {
                content: userInfo.code,
              },
            ],
          },
        };
      },
    }),
  }),
});

export const { useSubmitCodeMutation } = submitApi;
