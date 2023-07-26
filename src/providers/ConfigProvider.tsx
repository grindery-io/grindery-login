import React, { useEffect, useMemo } from "react";
import { appStoreActions, useAppDispatch } from "../store";

type Props = {
  children: React.ReactNode;
};

const ConfigProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const queryString = window.location.search;
  const urlParams = useMemo(
    () => new URLSearchParams(queryString),
    [queryString]
  );
  const redirect_uri = urlParams.get("redirect_uri");
  const workspaceRequired = urlParams.get("workspace_required");

  useEffect(() => {
    if (redirect_uri) {
      dispatch(appStoreActions.setRedirect(redirect_uri));
    }
  }, [redirect_uri, dispatch]);

  useEffect(() => {
    if (workspaceRequired === "1") {
      dispatch(appStoreActions.setIsWorkspaceRequired(true));
    }
  }, [workspaceRequired, dispatch]);

  return <>{children}</>;
};

export default ConfigProvider;
