import React from "react";
import { Column } from "./Column";
import { Steps } from "./Steps";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

type Props = {};

export const LeftColumn = (props: Props) => {
  return (
    <Column
      sx={{
        background: "#E0EDEE",
        order: { xs: 2, sm: 1 },
      }}
    >
      <Steps>
        <Typography variant="h1" component="h2" sx={{ margin: 0, padding: 0 }}>
          Kickstart Steps
        </Typography>
        <List>
          <ListItem>
            <ListItemText>Create an account</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Confirm your email to activate it</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Build your workflows!</ListItemText>
          </ListItem>
        </List>
        <Typography variant="body2">
          To get support check links in the email or use the in-app chat
        </Typography>
      </Steps>
    </Column>
  );
};
