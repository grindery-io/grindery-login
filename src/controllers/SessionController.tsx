import React, { useCallback, useEffect } from "react";
import axios from "axios";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { ENGINE_URL } from "../config";
import { getErrorMessage } from "../utils";

/**
 * A component for managing and restoring user authentication sessions.
 *
 * It retrieves the user's wallet address from local storage, and if found,
 * requests the associated session from the server. If a valid session is returned,
 * the component posts the session data to the parent window.
 *
 * This component doesn't render any visible UI, but runs
 * the aforementioned operations when mounted.
 */
const SessionController = () => {
  // get user wallet address from local storage
  const address = localStorage.getItem("grindery_user_address");

  // try to restore user auth session
  const restoreSession = useCallback(async () => {
    try {
      // throw error if no address
      if (!address) {
        throw new Error("No address");
      }

      // get user auth session from engine
      const tokenOrMessageResponse = await axios.get(
        `${ENGINE_URL}/oauth/session?address=${address}`,
        {
          withCredentials: true,
        }
      );

      // throw error if user auth session is not present
      if (!tokenOrMessageResponse.data.access_token) {
        throw new Error("No token");
      }

      // get user token object
      const accessToken = tokenOrMessageResponse.data;

      // remove refresh token from user token object
      delete accessToken.refresh_token;

      // get parent origin
      // eslint-disable-next-line
      const parentOrigin = document.referrer.match(/^.+:\/\/[^\/]+/)?.[0];

      // throw error if parent origin is not grindery.io
      if (
        !parentOrigin?.endsWith("grindery.io") &&
        !parentOrigin?.endsWith("grindery.org")
      ) {
        throw new Error("Incorrect origin");
      }

      // get user id from token
      const decodedToken = jwt_decode<JwtPayload>(
        accessToken?.access_token || ""
      );
      const userId = decodedToken.sub || "";

      // send user token object to parent window
      window.parent.postMessage(
        {
          method: "grindery-auth-session",
          params: { token: accessToken, user: userId, address },
        },
        parentOrigin || "*"
      );
    } catch (error: any) {
      console.error("restoreSession error: ", getErrorMessage(error));

      // send error message to parent window
      window.parent.postMessage(
        { method: "grindery-auth-session", error: getErrorMessage(error) },
        "*"
      );
    }
  }, [address]);

  // clear user auth session
  const clearSession = useCallback(async () => {
    try {
      await axios.post(
        `${ENGINE_URL}/oauth/session-register`,
        {},
        { withCredentials: true }
      );

      // remove user address from local storage
      localStorage.removeItem("grindery_user_address");
    } catch (error: any) {
      console.error("clearSession error: ", getErrorMessage(error));
    }
  }, []);

  // restore user auth session on mount
  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  // listen for auth session clear message from parent window
  useEffect(() => {
    // handle message
    function handleMessage(event: any) {
      if (event.data?.method === "grindery-auth-session-clear") {
        clearSession();
      }
    }

    // add event listener
    window.addEventListener("message", handleMessage);

    // remove event listener on unmount
    return () => window.removeEventListener("message", handleMessage);
  }, [clearSession]);

  return <></>;
};

export default SessionController;
