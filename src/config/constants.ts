export const ENGINE_URL = "https://orchestrator.grindery.org";
export const DEFAULT_REDIRECT = "https://app.grindery.io";

export type StatusDetailsType = {
  severity: "info" | "warning" | "error" | "success";
  text: string;
};

export const STATUS_DETAILS: StatusDetailsType[] = [
  { severity: "info", text: "Connect MetaMask wallet" },
  {
    severity: "warning",
    text: "Select account in MetaMask",
  },
  { severity: "warning", text: "Sign message in MetaMask" },
  { severity: "info", text: "Authenticating..." },
  { severity: "info", text: "Redirecting..." },
  { severity: "warning", text: "Provide email address" },
  {
    severity: "info",
    text: "We just sent you a confirmation email. Please check your email and click confirm button to activate your account.",
  },
  { severity: "warning", text: "Select workspace" },
  { severity: "error", text: "Error" },
];

export const ONBOARDING_FIELDS = {
  interest: {
    title: "What brings you here?",
    description:
      "When we know what you are trying to do we can help you and personalize information and emails for you!",
    options: [
      {
        value: "Use Grindery to get stuff done",
        label: "Use Grindery to get stuff done",
      },
      {
        value: "Build an agent for myself or my organization",
        label: "Build an agent for myself or my organization",
      },
      {
        value: "Build an agent to publish it for others",
        label: "Build an agent to publish it for others",
      },
      {
        value: "Integrate my (d)App with Grindery",
        label: "Integrate my (d)App with Grindery",
      },
      { value: "Learning and exploration", label: "Learning and exploration" },
      { value: "Other", label: "Other" },
    ],
  },
  skill: {
    title: "What describes you best?",
    description:
      "When we better understand your skills we can show you the right tutorials and courses.",
    options: [
      {
        value: "web3",
        label: "I'm a web3 builder",
      },
      {
        value: "zapier",
        label: "I'm a Zapier guru",
      },
      { value: "code", label: "I'm a coding wizard" },
      { value: "human", label: "I'm only human" },
    ],
  },
};
