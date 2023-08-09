import React from "react";
import { Title } from "./Title";
import WelcomeWrapper from "./WelcomeWrapper";

type Props = {};

const GrinderyPingWelcome = (props: Props) => {
  return (
    <WelcomeWrapper>
      <img
        src="/images/welcome/ping.svg"
        alt="Grindery Ping"
        style={{
          maxWidth: "100%",
          width: "100%",
          height: "auto",
          marginBottom: "24px",
        }}
      />
      <Title
        title="Welcome to Ping"
        description="Ping sends you a browser notification when a token is deposited to any
        of your wallets on any blockchain."
      />
    </WelcomeWrapper>
  );
};

export default GrinderyPingWelcome;
