import { Stack } from "@mui/material";
import React from "react";

type Props = {};

const FundedBy = (props: Props) => {
  return (
    <Stack
      sx={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: { xs: "center", lg: "space-between" },
        flexWrap: {
          xs: "wrap",
          lg: "nowrap",
        },
        width: "100%",
        maxWidth: "calc(100% - 80px)",
        paddingBottom: "40px",
        paddingTop: "16px",
        gap: { xs: "16px 32px", lg: "16px" },
        "& span": {
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "150%",
          color: "#808898",
          display: "block",
          width: {
            xs: "100%",
            lg: "auto",
          },
        },
      }}
    >
      <span>Funded by</span>
      <img src="/images/funded/harmony.svg" alt="Harmony" />
      <img src="/images/funded/binance.svg" alt="Binance" />
      <img src="/images/funded/near.svg" alt="Near" />
      <img src="/images/funded/flow.svg" alt="Flow" />
      <img src="/images/funded/algorand.svg" alt="Algorand" />
    </Stack>
  );
};

export default FundedBy;
