import React from "react";
import { Column } from "./Column";
import AppSpecificContent from "./AppSpecificContent";
import FundedBy from "./FundedBy";

type Props = {};

export const LeftColumn = (props: Props) => {
  return (
    <Column
      sx={{
        background: "#E0EDEE",
        order: { xs: 2, sm: 1 },
        position: "relative",
        padding: {
          xs: "72px 40px 165px",
          lg: "72px 40px",
        },
      }}
    >
      <AppSpecificContent />
      <FundedBy />
    </Column>
  );
};
