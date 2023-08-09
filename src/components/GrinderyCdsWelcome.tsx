import React from "react";
import { Title } from "./Title";
import WelcomeWrapper from "./WelcomeWrapper";

type Props = {};

const GrinderyCdsWelcome = (props: Props) => {
  return (
    <WelcomeWrapper>
      <img src="/images/welcome/cds.svg" alt="Grindery Developers Network" />
      <Title
        title="Welcome to Grindery CDS"
        description="Grindery CDS allows you to create, clone and edit Connector
        Description Schema files."
      />
    </WelcomeWrapper>
  );
};

export default GrinderyCdsWelcome;
