import React from "react";
import { Box } from "@mui/material";
import { Title } from "./Title";

type Props = {};

const GrinderyCdsWelcome = (props: Props) => {
  return (
    <Box sx={{ marginBottom: "20px", textAlign: "center" }}>
      <img
        src="/images/welcome/cds.svg"
        alt="Grindery Developers Network"
        style={{
          maxWidth: "450px",
          width: "100%",
          height: "auto",
          marginBottom: "24px",
        }}
      />
      <Title
        title="Welcome to Grindery CDS"
        description="Grindery CDS allows you to create, clone and edit Connector
        Description Schema files."
      />
    </Box>
  );
};

export default GrinderyCdsWelcome;
