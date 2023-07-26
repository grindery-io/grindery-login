import NexusClient from "grindery-nexus-client";

/**
 * Check if user has opted-in
 *
 * @param {string} accessToken - User's access token
 * @returns {Promise<boolean>} - Has user opted-in or not
 */
export const isUserOptin = async (accessToken: string): Promise<boolean> => {
  if (!accessToken) {
    throw Error("Access token is required");
  }
  try {
    const client = new NexusClient(accessToken);
    const res = await client.user.isAllowed({});
    return Boolean(res);
  } catch (error: any) {
    const errorMessage = error.message || "Unknown error";
    console.error("isUserOptin error", errorMessage);
    throw Error(errorMessage);
  }
};
