import React from "react";
import { Box } from "@mui/material";
import { Title } from "./Title";

type Props = {};

const GrinderyGatewayWelcome = (props: Props) => {
  return (
    <Box sx={{ marginBottom: "20px", textAlign: "center" }}>
      <img
        src="/images/welcome/gateway.svg"
        alt="Grindery Gateway"
        style={{
          maxWidth: "450px",
          width: "100%",
          height: "auto",
          marginBottom: "24px",
        }}
      />
      <Title
        title="The no-code Web3 Gateway"
        description="Grindery Gateway allows you to implement Zapier workflows that read and
        write data from over 10 blockchains without a single line of code and
        without having any tokens. The easiest way to Web3 is just one click
        away!"
      />
    </Box>
  );
};

export default GrinderyGatewayWelcome;
