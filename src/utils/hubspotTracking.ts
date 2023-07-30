declare global {
  interface Window {
    _hsq?: any[];
  }
}

export const sendHubSpotIdentity = (userId: string, email: string) => {
  let _hsq = (window._hsq = window._hsq || []);
  _hsq.push([
    "identify",
    {
      email: email,
      id: userId,
    },
  ]);
};
