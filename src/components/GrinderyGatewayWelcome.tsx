import React from "react";
import { Title } from "./Title";
import WelcomeWrapper from "./WelcomeWrapper";

type Props = {};

const GrinderyGatewayWelcome = (props: Props) => {
  return (
    <WelcomeWrapper>
      <img src="/images/welcome/gateway.svg" alt="Grindery Gateway" />
      <Title
        title="The no-code Web3 Gateway"
        description="Grindery Gateway allows you to implement Zapier workflows that read and
        write data from over 10 blockchains without a single line of code and
        without having any tokens. The easiest way to Web3 is just one click
        away!"
      />
    </WelcomeWrapper>
  );
};

export default GrinderyGatewayWelcome;
