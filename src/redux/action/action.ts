import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CodeSubmissionState {
  code: string;
  language: string;
  output: string;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: CodeSubmissionState = {
  code: "",
  language: "",
  output: "",
  error: null,
  status: "idle",
};

const codeSubmissionSlice = createSlice({
  name: "codeSubmission",
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    startExecution: (state) => {
      state.status = "loading";
      state.error = null;
      state.output = "";
    },
    executionSuccess: (state, action: PayloadAction<string>) => {
      state.status = "succeeded";
      state.output = action.payload;
    },
    executionFailure: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  setCode,
  setLanguage,
  startExecution,
  executionSuccess,
  executionFailure,
} = codeSubmissionSlice.actions;

export default codeSubmissionSlice.reducer;
