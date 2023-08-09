import React from "react";
import { Title } from "./Title";
import WelcomeWrapper from "./WelcomeWrapper";

type Props = {};

const GrinderyAppWelcome = (props: Props) => {
  return (
    <WelcomeWrapper>
      <img src="/images/welcome/app.svg" alt="Grindery App" />
      <Title
        title="Welcome to Grindery App"
        description="We are the easiest and fasted way for anyone to build and use
          autonomous agents to connect Apps and dApps"
      />
    </WelcomeWrapper>
  );
};

export default GrinderyAppWelcome;
