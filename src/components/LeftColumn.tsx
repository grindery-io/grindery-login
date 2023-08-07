import React from "react";
import { Column } from "./Column";
import { Steps } from "./Steps";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import AppSpecificContent from "./AppSpecificContent";

type Props = {};

export const LeftColumn = (props: Props) => {
  return (
    <Column
      sx={{
        background: "#E0EDEE",
        order: { xs: 2, sm: 1 },
      }}
    >
      <AppSpecificContent />
      <Box sx={{ maxWidth: "390px", margin: "0 auto 50px" }}>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "400",
            lineHeight: "150%;",
            margin: 0,
            padding: 0,
          }}
        >
          Grindery is the easiest and fasted way for anyone to build and use
          autonomous agents to connect Apps and dApps
        </Typography>
      </Box>
      <Steps>
        <Typography variant="h1" component="h3" sx={{ margin: 0, padding: 0 }}>
          New to Grindery?
        </Typography>
        <List>
          <ListItem>
            <ListItemText>Create an account</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              Click on the link in the confirmation email
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Start working on agent</ListItemText>
          </ListItem>
        </List>
        <Typography variant="body2">
          You will be able to find support and contact options in the email.
        </Typography>
      </Steps>
    </Column>
  );
};
