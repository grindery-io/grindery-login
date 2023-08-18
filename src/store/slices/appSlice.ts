import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DEFAULT_REDIRECT } from "../../config";

// Enum to represent different authentication statuses
export enum STATUS {
  UNAUTHENTICATED = 0,
  WAITING_ACCOUNT = 1,
  WAITING_SIGNATURE = 2,
  AUTHENTICATING = 3,
  REDIRECTING = 4,
  WAITING_EMAIL = 5,
  WAITING_EMAIL_CONFIRMATION = 6,
  WAITING_WORKSPACE = 7,
  ERROR = 8,
}

// Interface for the AuthToken object
export type AuthToken = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
};

export type WorkspaceType = {
  key: string;
  title: string;
  [key: string]: any;
};

// Interface for the AppState object representing the state of the app
interface AppState {
  error: string; // Error message
  isDebugMode: boolean; // Debug mode flag
  isLoading: boolean; // Loading flag
  isWorkspaceRequired: boolean; // Workspace required flag
  redirect: string; // Redirect URL
  responseType: string; // Response type
  state: string; // State
  status: STATUS; // App status
  token: AuthToken | null; // Auth token
  workspaces: WorkspaceType[]; // List of user workspaces
  workspace: string; // Selected workspace
  responsePath: string; // Chat response path
  phone: string; // User phone number
}

// Initial state for the app's Redux store
const initialState: AppState = {
  error: "",
  isDebugMode: false,
  isLoading: false,
  isWorkspaceRequired: false,
  redirect: DEFAULT_REDIRECT,
  responseType: "",
  state: "",
  status: STATUS.UNAUTHENTICATED,
  token: null,
  workspaces: [],
  workspace: "personal",
  responsePath: "",
  phone: "",
};

// Create a Redux slice for the app store with reducer functions
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Reducer to set the isLoading state
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    // Reducer to set the status state
    setStatus(state, action: PayloadAction<STATUS>) {
      state.status = action.payload;
    },
    // Reducer to set the isWorkspaceRequired state
    setIsWorkspaceRequired(state, action: PayloadAction<boolean>) {
      state.isWorkspaceRequired = action.payload;
    },
    // Reducer to set the redirect state
    setRedirect(state, action: PayloadAction<string>) {
      state.redirect = action.payload;
    },
    // Reducer to set the token state
    setToken(state, action: PayloadAction<AuthToken | null>) {
      state.token = action.payload;
    },
    // Reducer to set the error state
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    // Reducer to set the workspaces state
    setWorkspaces(state, action: PayloadAction<WorkspaceType[]>) {
      state.workspaces = action.payload;
    },
    // Reducer to set the workspace state
    setWorkspace(state, action: PayloadAction<string>) {
      state.workspace = action.payload;
    },
    // Reducer to set the isDebugMode state
    setIsDebugMode(state, action: PayloadAction<boolean>) {
      state.isDebugMode = action.payload;
    },
    // Reducer to set the responseType state
    setResponseType(state, action: PayloadAction<string>) {
      state.responseType = action.payload;
    },
    // Reducer to set the state state
    setState(state, action: PayloadAction<string>) {
      state.state = action.payload;
    },
    setResponsePath(state, action: PayloadAction<string>) {
      state.responsePath = action.payload;
    },
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload;
    },
  },
});

// Selector function to access the app state from the Redux store
export const selectAppStore = (state: RootState) => state.app;

// Export the action creators generated by createSlice
export const appStoreActions = appSlice.actions;

// Export the reducer function generated by createSlice
export default appSlice.reducer;
