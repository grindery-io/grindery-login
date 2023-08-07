import React from "react";
import { Column } from "./Column";
import AppSpecificContent from "./AppSpecificContent";

type Props = {};

export const LeftColumn = (props: Props) => {
  return (
    <Column
      sx={{
        background: "#fff",
        order: { xs: 2, sm: 1 },
      }}
    >
      <AppSpecificContent />
    </Column>
  );
};
