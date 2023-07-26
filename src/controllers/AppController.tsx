import React, {
  useContext,
  createContext,
  useCallback,
  useEffect,
} from "react";
import NexusClient from "grindery-nexus-client";
// @ts-ignore
import Web3Modal from "web3modal";
// @ts-ignore
import * as ethers from "ethers";
import { ENGINE_URL } from "../config";
import axios from "axios";
import {
  AuthToken,
  STATUS,
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../store";
import { encode } from "universal-base64url";
import { getErrorMessage } from "../utils";
// @ts-ignore
import Cookies from "js-cookie";

type ContextProps = {
  handleConnectMetaMaskClick: () => void;
  handleSubmitEmailClick: (input: { [key: string]: string[] }) => void;
  handleEmailConfirmedClick: () => void;
  handleWorkspaceSubmitClick: () => void;
};

type AppControllerProps = {
  children: React.ReactNode;
};

export const AppContext = createContext<ContextProps>({
  handleConnectMetaMaskClick: () => {},
  handleSubmitEmailClick: () => {},
  handleEmailConfirmedClick: () => {},
  handleWorkspaceSubmitClick: () => {},
});

const AppController = ({ children }: AppControllerProps) => {
  const dispatch = useAppDispatch();
  const {
    redirect,
    token,
    isWorkspaceRequired,
    workspaces,
    status,
    workspace,
  } = useAppSelector(selectAppStore);
  const selectedWorkspace = workspaces.find((w) => w.key === workspace);

  const handleConnectMetaMaskClick = useCallback(async () => {
    dispatch(appStoreActions.setIsLoading(true));
    dispatch(appStoreActions.setStatus(STATUS.WAITING_ACCOUNT));
    try {
      let accessToken: AuthToken | null = null;
      const web3Modal = new Web3Modal({
        cacheProvider: false,
        network: "mainnet",
      });
      const provider = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(provider, "any");
      const userAddress = await ethersProvider.getSigner().getAddress();
      const tokenOrMessageResponse = await axios.get(
        `${ENGINE_URL}/oauth/session?address=${userAddress}`,
        {
          withCredentials: true,
        }
      );
      if (tokenOrMessageResponse.data.access_token) {
        accessToken = tokenOrMessageResponse.data;
      } else if (tokenOrMessageResponse.data.message) {
        dispatch(appStoreActions.setStatus(STATUS.WAITING_SIGNATURE));
        const signature = await ethersProvider
          .getSigner()
          .signMessage(tokenOrMessageResponse.data.message);
        dispatch(appStoreActions.setStatus(STATUS.AUTHENTICATING));
        const code = encode(
          JSON.stringify({
            message: tokenOrMessageResponse.data.message,
            signature: signature,
          })
        );
        const accessTokenResponse = await axios.post(
          `${ENGINE_URL}/oauth/token`,
          {
            grant_type: "authorization_code",
            code: code,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (accessTokenResponse.data.access_token) {
          accessToken = accessTokenResponse.data;
        } else {
          throw new Error("Unknown server error. Please, try again later.");
        }
      }
      dispatch(appStoreActions.setToken(accessToken));
      const client = new NexusClient(accessToken?.access_token);
      const isUserHasEmail = await client.user.hasEmail();
      if (Boolean(isUserHasEmail)) {
        if (isWorkspaceRequired) {
          dispatch(appStoreActions.setStatus(STATUS.WAITING_WORKSPACE));
        } else {
          dispatch(appStoreActions.setStatus(STATUS.REDIRECTING));
        }
      } else {
        dispatch(appStoreActions.setStatus(STATUS.WAITING_EMAIL));
      }
    } catch (error: any) {
      console.error("handleConnectMetaMaskClick error", error);
      dispatch(appStoreActions.setError(getErrorMessage(error)));
      dispatch(appStoreActions.setToken(null));
      dispatch(appStoreActions.setStatus(STATUS.ERROR));
    }
    dispatch(appStoreActions.setIsLoading(false));
  }, [isWorkspaceRequired, dispatch]);

  const handleSubmitEmailClick = useCallback(
    async (input: { [key: string]: string[] }) => {
      dispatch(appStoreActions.setIsLoading(true));
      dispatch(appStoreActions.setStatus(STATUS.AUTHENTICATING));
      try {
        const client = new NexusClient(token?.access_token);
        const res = await client.user.requestEarlyAccess({
          email: input.email[0],
          source: window.location.href,
          app: "Requested to Gateway",
          interest: input.interest.join(";"),
          skill: input.skill.join(";"),
          hutk: Cookies.get("hubspotutk") || "",
          pageName: document.getElementsByTagName("title")[0].innerHTML || "",
        });
        if (!res) {
          throw new Error("Unknown server error. Please, try again later.");
        }
        dispatch(appStoreActions.setStatus(STATUS.WAITING_EMAIL_CONFIRMATION));
      } catch (error: any) {
        console.error("handleSubmitEmailClick error", error);
        dispatch(appStoreActions.setError(getErrorMessage(error)));
        dispatch(appStoreActions.setToken(null));
        dispatch(appStoreActions.setStatus(STATUS.ERROR));
      }
      dispatch(appStoreActions.setIsLoading(false));
    },
    [token, dispatch]
  );

  const handleEmailConfirmedClick = useCallback(async () => {
    if (isWorkspaceRequired) {
      dispatch(appStoreActions.setStatus(STATUS.WAITING_WORKSPACE));
    } else {
      dispatch(appStoreActions.setStatus(STATUS.REDIRECTING));
    }
  }, [isWorkspaceRequired, dispatch]);

  const handleWorkspaceSubmitClick = useCallback(async () => {
    dispatch(appStoreActions.setStatus(STATUS.REDIRECTING));
  }, [dispatch]);

  const getWorkspaces = useCallback(async () => {
    if (token && token.access_token) {
      dispatch(appStoreActions.setIsLoading(true));
      try {
        const client = new NexusClient(token?.access_token);
        const workspaces = await client.workspace.list();
        dispatch(appStoreActions.setWorkspaces(workspaces));
      } catch (error: any) {
        console.error("getWorkspaces error: ", error);
      }
      dispatch(appStoreActions.setIsLoading(false));
    }
  }, [token, dispatch]);

  const getCode = useCallback(async () => {
    dispatch(appStoreActions.setIsLoading(true));
    try {
      const res = await axios.post(
        `https://orchestrator.grindery.org/oauth/get-login-code`,
        {},
        {
          headers: {
            Authorization: `Bearer ${
              selectedWorkspace?.token || token?.access_token || ""
            }`,
          },
        }
      );

      if (res?.data?.code) {
        window.location.href = `${redirect}${
          /\?/.test(redirect) ? "&" : "?"
        }code=${res?.data?.code}`;
      } else {
        throw new Error("Unknown server error. Please, try again later.");
      }
    } catch (error: any) {
      console.error("getCode errror: ", error);
      dispatch(appStoreActions.setError(getErrorMessage(error)));
      dispatch(appStoreActions.setToken(null));
      dispatch(appStoreActions.setStatus(STATUS.ERROR));
    }
    dispatch(appStoreActions.setIsLoading(false));
  }, [token, selectedWorkspace, redirect, dispatch]);

  useEffect(() => {
    getWorkspaces();
  }, [getWorkspaces]);

  useEffect(() => {
    if (status === STATUS.REDIRECTING) {
      getCode();
    }
  }, [status, getCode]);

  return (
    <AppContext.Provider
      value={{
        handleConnectMetaMaskClick,
        handleSubmitEmailClick,
        handleEmailConfirmedClick,
        handleWorkspaceSubmitClick,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppController = () => useContext(AppContext);

export default AppController;
