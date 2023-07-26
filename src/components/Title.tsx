import { Box, Typography } from "@mui/material";
import React from "react";

type Props = {
  title: string;
  description?: string;
};

export const Title = ({ title, description }: Props) => {
  return (
    <Box textAlign="center">
      <Typography variant="h1">{title}</Typography>
      {description && (
        <Typography style={{ marginTop: "8px" }}>{description}</Typography>
      )}
    </Box>
  );
};
