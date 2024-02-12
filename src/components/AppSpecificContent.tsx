import React from "react";
import { selectAppStore, useAppSelector } from "../store";
import { Box } from "@mui/material";
import GrinderyTemplatesWelcome from "./GrinderyTemplatesWelcome";
import GrinderyAppWelcome from "./GrinderyAppWelcome";
import GrinderyPingWelcome from "./GrinderyPingWelcome";
import GrinderyCdsWelcome from "./GrinderyCdsWelcome";
import GrinderyGatewayWelcome from "./GrinderyGatewayWelcome";

type Props = {};

const AppSpecificContent = (props: Props) => {
  const { redirect } = useAppSelector(selectAppStore);
  const renderContent = () => {
    if (redirect.includes("templates.grindery.com")) {
      return <GrinderyTemplatesWelcome />;
    }
    if (
      redirect.includes("ping.grindery.") ||
      redirect.includes("ping-staging.grindery.")
    ) {
      return <GrinderyPingWelcome />;
    }
    if (
      redirect.includes("network.grindery.") ||
      redirect.includes("cds.grindery.") ||
      redirect.includes("network-staging.grindery.")
    ) {
      return <GrinderyCdsWelcome />;
    }
    if (
      redirect.includes("gateway.grindery.") ||
      redirect.includes("gateway-staging.grindery.") ||
      redirect.includes("zapier.com")
    ) {
      return <GrinderyGatewayWelcome />;
    }
    return <GrinderyAppWelcome />;
  };
  return (
    <Box
      sx={{
        "& h1": {
          maxWidth: "390px",
          margin: "0 auto",
          fontSize: "24px",
          fontWeight: "bold",
          lineHeight: "120%",
        },
        "& p": {
          maxWidth: "390px",
          margin: "0 auto",
          fontSize: "18px",
          fontWeight: "normal",
          lineHeight: "150%",
        },
      }}
    >
      {renderContent()}
    </Box>
  );
};

export default AppSpecificContent;
