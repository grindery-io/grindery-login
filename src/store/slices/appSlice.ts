import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DEFAULT_REDIRECT } from "../../config";

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

export type AuthToken = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
};

interface AppState {
  error: string;
  isDebugMode: boolean;
  isLoading: boolean;
  isWorkspaceRequired: boolean;
  redirect: string;
  status: STATUS;
  token: AuthToken | null;
  workspaces: any[];
  workspace: string;
}

const initialState: AppState = {
  error: "",
  isDebugMode: false,
  isLoading: false,
  isWorkspaceRequired: false,
  redirect: DEFAULT_REDIRECT,
  status: STATUS.UNAUTHENTICATED,
  token: null,
  workspaces: [],
  workspace: "personal",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setStatus(state, action: PayloadAction<STATUS>) {
      state.status = action.payload;
    },
    setIsWorkspaceRequired(state, action: PayloadAction<boolean>) {
      state.isWorkspaceRequired = action.payload;
    },
    setRedirect(state, action: PayloadAction<string>) {
      state.redirect = action.payload;
    },
    setToken(state, action: PayloadAction<AuthToken | null>) {
      state.token = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setWorkspaces(state, action: PayloadAction<any[]>) {
      state.workspaces = action.payload;
    },
    setWorkspace(state, action: PayloadAction<string>) {
      state.workspace = action.payload;
    },
    setIsDebugMode(state, action: PayloadAction<boolean>) {
      state.isDebugMode = action.payload;
    },
  },
});

export const selectAppStore = (state: RootState) => state.app;
export const appStoreActions = appSlice.actions;
export default appSlice.reducer;
