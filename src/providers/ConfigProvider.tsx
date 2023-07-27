import React, { useEffect, useMemo } from "react";
import { appStoreActions, useAppDispatch } from "../store";

// define component properties
type Props = {
  children: React.ReactNode;
};

/**
 * The ConfigProvider is a React component that serves as
 * a configuration provider for a Redux-powered application.
 *
 * It extracts query parameters from the current URL, processes them,
 * and dispatches actions to update the application state
 * based on those parameters.
 *
 * To use the ConfigProvider, you need to wrap your application with it.
 * This ensures that the configuration parameters from the URL
 * are processed and made available in the Redux store.
 */
const ConfigProvider = ({ children }: Props) => {
  // redux dispatcher
  const dispatch = useAppDispatch();

  // get query params
  const queryString = window.location.search;

  // memoize query params
  const urlParams = useMemo(
    () => new URLSearchParams(queryString),
    [queryString]
  );

  // get redirect uri
  const redirect_uri = urlParams.get("redirect_uri");

  // get workspace required
  const workspaceRequired = urlParams.get("workspace_required");

  // get response type
  const response_type = urlParams.get("response_type");

  // get state param
  const state = urlParams.get("state");

  // get debug mode
  const debugMode = urlParams.get("debug");

  // set redirect uri to store
  useEffect(() => {
    if (redirect_uri) {
      dispatch(appStoreActions.setRedirect(redirect_uri));
    }
  }, [redirect_uri, dispatch]);

  // set workspace required to store
  useEffect(() => {
    if (workspaceRequired === "1") {
      dispatch(appStoreActions.setIsWorkspaceRequired(true));
    }
  }, [workspaceRequired, dispatch]);

  // set debug mode to store
  useEffect(() => {
    if (debugMode === "1") {
      dispatch(appStoreActions.setIsDebugMode(true));
    }
  }, [debugMode, dispatch]);

  // set response type to store
  useEffect(() => {
    if (response_type) {
      dispatch(appStoreActions.setResponseType(response_type));
    }
  }, [response_type, dispatch]);

  // set state to store
  useEffect(() => {
    if (state) {
      dispatch(appStoreActions.setState(state));
    }
  }, [state, dispatch]);

  return <>{children}</>;
};

export default ConfigProvider;
