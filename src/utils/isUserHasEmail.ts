import NexusClient from "grindery-nexus-client";

/**
 * Check if user has email
 *
 * @param {string} accessToken - User's access token
 * @returns {Promise<boolean>} - Whether user has email or not
 */
export const isUserHasEmail = async (accessToken: string): Promise<boolean> => {
  if (!accessToken) {
    throw Error("Access token is required");
  }
  try {
    const client = new NexusClient(accessToken);
    const res = await client.user.hasEmail();
    return Boolean(res);
  } catch (error: any) {
    const errorMessage = error.message || "Unknown error";
    console.error("isUserHasEmail error", errorMessage);
    throw Error(errorMessage);
  }
};
