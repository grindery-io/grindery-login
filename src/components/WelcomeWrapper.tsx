import React from "react";
import { Box } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const WelcomeWrapper = ({ children }: Props) => {
  return (
    <Box
      sx={{
        marginBottom: "20px",
        textAlign: "center",
        maxWidth: "500px",
        "& p": {
          fontSize: "16px",
          maxWidth: "100% !important",
          marginTop: "16px !important",
        },
        "& h1": {
          fontSize: "24px",
          maxWidth: "100% !important",
        },
        "& img": {
          maxWidth: "100%",
          width: "100%",
          height: "auto",
          marginBottom: "24px",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default WelcomeWrapper;
