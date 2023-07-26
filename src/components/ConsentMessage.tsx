import { Link, Typography } from "@mui/material";
import React from "react";

type Props = {};

export const ConsentMessage = (props: Props) => {
  return (
    <Typography
      variant="body2"
      sx={{
        paddingTop: "16px",
      }}
    >
      By clicking "Continue" above, you acknowledge that you have read,
      understood, and agree with our{" "}
      <Link
        href="https://docs.google.com/document/u/1/d/e/2PACX-1vROgga4q_jago0wilXMB28BxXoymaaegLv5pwCSVZMi8QRCp7oXmfxIhMEXeVC8Hrg3eBBGooMMa641/pub"
        target="_blank"
        rel="noreferrer"
      >
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link
        href="https://www.grindery.io/privacy"
        target="_blank"
        rel="noreferrer"
      >
        Privacy Policy
      </Link>
      .
    </Typography>
  );
};
