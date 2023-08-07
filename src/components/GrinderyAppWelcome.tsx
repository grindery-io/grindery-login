import React from "react";
import { Box } from "@mui/material";
import { Title } from "./Title";

type Props = {};

const GrinderyAppWelcome = (props: Props) => {
  return (
    <Box sx={{ marginBottom: "20px", textAlign: "center" }}>
      <img src="/images/welcome/app.svg" alt="Grindery App" />
      <Title
        title="Welcome to Grindery App"
        description="We are the easiest and fasted way for anyone to build and use
          autonomous agents to connect Apps and dApps"
      />
    </Box>
  );
};

export default GrinderyAppWelcome;
