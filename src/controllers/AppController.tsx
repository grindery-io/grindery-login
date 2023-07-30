import React, {
  useContext,
  createContext,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import jwt_decode, { JwtPayload } from "jwt-decode";
import NexusClient from "grindery-nexus-client";
// @ts-ignore
import Web3Modal from "web3modal";
// @ts-ignore
import * as ethers from "ethers";
// @ts-ignore
import Cookies from "js-cookie";
import { encode } from "universal-base64url";
import { ENGINE_URL } from "../config";
import {
  AuthToken,
  STATUS,
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../store";
import {
  getErrorMessage,
  sendGoogleEvent,
  sendHubSpotIdentity,
  sendLuckyorangeIdentity,
  sendTwitterConversion,
} from "../utils";
import useContentHeight from "../hooks/useContentHeight";

// define context properties
type ContextProps = {
  // A function that handles the logic for connecting to the MetaMask wallet.
  handleConnectMetaMaskClick: () => void;

  // A function that takes an object of key-value pairs where the key is a string and the value is an array of strings. It handles the logic of submitting an email and other user data.
  handleSubmitEmailClick: (input: { [key: string]: string[] }) => void;

  // A function that handles the logic after the email confirmation button is clicked.
  handleEmailConfirmedClick: () => void;

  // A function that handles the logic after the workspace submit button is clicked.
  handleWorkspaceSubmitClick: () => void;
};

// define component properties
type AppControllerProps = {
  children: React.ReactNode;
};

// initialize AppContext
export const AppContext = createContext<ContextProps>({
  handleConnectMetaMaskClick: () => {},
  handleSubmitEmailClick: () => {},
  handleEmailConfirmedClick: () => {},
  handleWorkspaceSubmitClick: () => {},
});

/**
 * AppController is a key component in the React application responsible for managing
 * the logic associated with various user actions, such as connecting with MetaMask,
 * submitting emails, confirming emails, and submitting workspaces.
 *
 * It makes extensive use of the Redux store to handle state management and uses
 * a React context (AppContext) to provide methods for handling different user actions.
 *
 * This component also integrates with the NexusClient library to communicate with
 * a remote server and it uses the Web3Modal library to connect with the MetaMask Ethereum wallet.
 *
 * It's a functional component that leverages React Hooks to manage
 * side effects (useEffect) and memorize callbacks (useCallback).
 *
 * @param {object} props - Contains the React children nodes to be rendered.
 * @returns {JSX.Element} A provider component which provides the AppContext to its children.
 */
const AppController = ({ children }: AppControllerProps) => {
  // get content height
  const { height } = useContentHeight();

  // redux dispatcher
  const dispatch = useAppDispatch();

  // get states from Redux store
  const {
    redirect, // The URL to which the app will redirect.
    token, // An authentication token.
    isWorkspaceRequired, // A boolean indicating if workspace selection is necessary.
    workspaces, // An array representing the user's workspaces.
    status, // The current status of the app.
    workspace, // The key of the selected workspace.
    isDebugMode, // A boolean indicating if debug mode is enabled.
    state, // The state parameter from the URL.
    responseType, // The response_type parameter from the URL.
  } = useAppSelector(selectAppStore);

  // get selected workspace object
  const selectedWorkspace = workspaces.find((w) => w.key === workspace);

  /**
   * Manages the logic of connecting to MetaMask.
   *
   * It creates an instance of Web3Modal, retrieves the user's Ethereum address,
   * gets an access token, and updates the app's status accordingly.
   */
  const handleConnectMetaMaskClick = useCallback(async () => {
    // set loading to true
    dispatch(appStoreActions.setIsLoading(true));

    // set status to waiting account
    dispatch(appStoreActions.setStatus(STATUS.WAITING_ACCOUNT));
    try {
      let accessToken: AuthToken | null = null;

      // create web3modal instance
      const web3Modal = new Web3Modal({
        cacheProvider: false,
        network: "mainnet",
      });

      // connect to metamask
      const provider = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(provider, "any");

      // get user address
      const userAddress = await ethersProvider.getSigner().getAddress();

      // get token or message
      const tokenOrMessageResponse = await axios.get(
        `${ENGINE_URL}/oauth/session?address=${userAddress}`,
        {
          withCredentials: true,
        }
      );

      // if token is present, set it to accessToken
      if (tokenOrMessageResponse.data.access_token) {
        accessToken = tokenOrMessageResponse.data;

        // if message is present, sign it and get access token
      } else if (tokenOrMessageResponse.data.message) {
        // set status to waiting signature
        dispatch(appStoreActions.setStatus(STATUS.WAITING_SIGNATURE));

        // sign message
        const signature = await ethersProvider
          .getSigner()
          .signMessage(tokenOrMessageResponse.data.message);

        // set status to authenticating
        dispatch(appStoreActions.setStatus(STATUS.AUTHENTICATING));

        // encode message and signature
        const code = encode(
          JSON.stringify({
            message: tokenOrMessageResponse.data.message,
            signature: signature,
          })
        );

        // get access token
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

        // if access token is present, set it to accessToken
        if (accessTokenResponse.data.access_token) {
          accessToken = accessTokenResponse.data;
        } else {
          throw new Error("Unknown server error. Please, try again later.");
        }
      }

      // set token to store
      dispatch(appStoreActions.setToken(accessToken));

      // get user wallet address from token
      const decodedToken = jwt_decode<JwtPayload>(
        accessToken?.access_token || ""
      );
      const userId = decodedToken.sub || "";
      const address = userId.split(":")[2];

      // save user wallet address to local storage
      localStorage.setItem("grindery_user_address", address);

      // create nexus client
      const client = new NexusClient(accessToken?.access_token);

      // check if user has email
      const isUserHasEmail = await client.user.hasEmail();

      // if user has email, set status to waiting workspace or redirecting
      if (Boolean(isUserHasEmail)) {
        // if selecting workspace is required, set status to waiting workspace
        if (isWorkspaceRequired) {
          dispatch(appStoreActions.setStatus(STATUS.WAITING_WORKSPACE));

          // if selecting workspace is not required, set status to redirecting
        } else {
          dispatch(appStoreActions.setStatus(STATUS.REDIRECTING));
        }

        // if user has no email, set status to waiting email
      } else {
        dispatch(appStoreActions.setStatus(STATUS.WAITING_EMAIL));
      }
    } catch (error: any) {
      // set error to store, update status to error and clear token in store
      console.error("handleConnectMetaMaskClick error", error);
      dispatch(appStoreActions.setError(getErrorMessage(error)));
      dispatch(appStoreActions.setToken(null));
      dispatch(appStoreActions.setStatus(STATUS.ERROR));
    }

    // set loading to false
    dispatch(appStoreActions.setIsLoading(false));
  }, [isWorkspaceRequired, dispatch]);

  /**
   * Handles the submission of an email and other user data.
   *
   * It communicates with the remote server via the NexusClient library
   * and updates the app's status accordingly.
   */
  const handleSubmitEmailClick = useCallback(
    async (input: { [key: string]: string[] }) => {
      // set loading to true
      dispatch(appStoreActions.setIsLoading(true));

      // set status to authenticating
      dispatch(appStoreActions.setStatus(STATUS.AUTHENTICATING));
      try {
        // if debug mode is enabled, skip the server and set status to waiting email confirmation
        if (!isDebugMode) {
          // create nexus client
          const client = new NexusClient(token?.access_token);

          // submit email and other user data to Hubspot
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
        }

        // set status to waiting email confirmation
        dispatch(appStoreActions.setStatus(STATUS.WAITING_EMAIL_CONFIRMATION));
      } catch (error: any) {
        // set error to store, update status to error and clear token in store
        console.error("handleSubmitEmailClick error", error);
        dispatch(appStoreActions.setError(getErrorMessage(error)));
        dispatch(appStoreActions.setToken(null));
        dispatch(appStoreActions.setStatus(STATUS.ERROR));
      }

      // set loading to false
      dispatch(appStoreActions.setIsLoading(false));
    },
    [isDebugMode, token, dispatch]
  );

  /**
   * Updates the app's status based on whether workspace selection is required after an email confirmation.
   */
  const handleEmailConfirmedClick = useCallback(async () => {
    // if selecting workspace required set status to waiting workspace
    if (isWorkspaceRequired) {
      dispatch(appStoreActions.setStatus(STATUS.WAITING_WORKSPACE));

      // if selecting workspace not required set status to redirecting
    } else {
      dispatch(appStoreActions.setStatus(STATUS.REDIRECTING));
    }
  }, [isWorkspaceRequired, dispatch]);

  /**
   * Simply updates the app's status to 'redirecting'.
   */
  const handleWorkspaceSubmitClick = useCallback(async () => {
    // set status to redirecting
    dispatch(appStoreActions.setStatus(STATUS.REDIRECTING));
  }, [dispatch]);

  /**
   * Retrieves the list of user's workspaces if an access token is available.
   *
   * It communicates with the remote server via the NexusClient library.
   */
  const getWorkspaces = useCallback(async () => {
    // if token is present, get workspaces
    if (token && token.access_token) {
      // set loading to true
      dispatch(appStoreActions.setIsLoading(true));
      try {
        // create nexus client
        const client = new NexusClient(token?.access_token);

        // get workspaces
        const workspaces = await client.workspace.list();

        // set workspaces to store
        dispatch(appStoreActions.setWorkspaces(workspaces));
      } catch (error: any) {
        console.error("getWorkspaces error: ", error);
      }

      // set loading to false
      dispatch(appStoreActions.setIsLoading(false));
    }
  }, [token, dispatch]);

  /**
   * Handles redirection based on a code received from the server.
   *
   * It also sends various events to Google, Twitter, and Luckyorange.
   */
  const getCode = useCallback(async () => {
    // set loading to true
    dispatch(appStoreActions.setIsLoading(true));

    try {
      // if token is present, send analytics events
      if (token?.access_token) {
        // register session
        if (token?.refresh_token) {
          await axios.post(
            `${ENGINE_URL}/oauth/session-register`,
            {
              refresh_token: token.refresh_token,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
        }

        // create nexus client
        const client = new NexusClient(token?.access_token);
        // get user id and email
        const user = client.user.get();
        const email = await client.user.getEmail();

        // if user exists send google event and twitter conversion
        if (user) {
          sendGoogleEvent({
            event: "registration",
            authentication_method: "wallet",
            user_id: user.id,
          });
          sendTwitterConversion("tw-ofep3-ofep7");

          // if email exists send luckyorange identity
          if (email) {
            sendLuckyorangeIdentity(user.id, {
              email,
            });
            sendHubSpotIdentity(user.id, email);
          }
        }
      }

      // if response type is code, get login code
      if (responseType === "code") {
        // get login code
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

        // if code is present, redirect to redirect url with code
        if (res?.data?.code) {
          // redirect to redirect url with code and state
          window.location.href = `${redirect}${
            /\?/.test(redirect) ? "&" : "?"
          }code=${res?.data?.code}${state ? "&state=" + state : ""}`;
        } else {
          throw new Error("Unknown server error. Please, try again later.");
        }
      } else {
        // redirect to redirect url without code and state
        window.location.href = redirect;
      }
    } catch (error: any) {
      // set error to store, update status to error and clear token in store
      console.error("getCode errror: ", error);
      dispatch(appStoreActions.setError(getErrorMessage(error)));
      dispatch(appStoreActions.setToken(null));
      dispatch(appStoreActions.setStatus(STATUS.ERROR));
    }

    // set loading to false
    dispatch(appStoreActions.setIsLoading(false));
  }, [state, responseType, token, selectedWorkspace, redirect, dispatch]);

  // get workspaces on component mount
  useEffect(() => {
    getWorkspaces();
  }, [getWorkspaces]);

  // get code and redirect user on status change
  useEffect(() => {
    if (status === STATUS.REDIRECTING) {
      getCode();
    }
  }, [status, getCode]);

  // send resize message to parent window on height change
  useEffect(() => {
    if (window && window.parent) {
      window.parent.postMessage(
        { method: "gr_resize", params: { height } },
        "*"
      );
    }
  }, [height]);

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

/**
 * `useAppController` is a custom hook that provides an easy way to access the `AppContext`.
 *
 * You can use this hook in any functional component that needs to interact
 * with the methods provided by `AppContext`.
 */
export const useAppController = () => useContext(AppContext);

export default AppController;
