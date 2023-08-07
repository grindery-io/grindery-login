import React from "react";
import { Box } from "@mui/material";
import { Title } from "./Title";

type Props = {};

const GrinderyPingWelcome = (props: Props) => {
  return (
    <Box sx={{ marginBottom: "20px", textAlign: "center" }}>
      <img
        src="/images/welcome/ping.png"
        alt="Grindery Ping"
        style={{
          maxWidth: "450px",
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
    </Box>
  );
};

export default GrinderyPingWelcome;
