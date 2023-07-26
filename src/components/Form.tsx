import { Stack, styled } from "@mui/material";

export const Form = styled(Stack)({
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "nowrap",
  gap: "32px",
  maxWidth: "360px",
  margin: "0 auto",
  "& h1": {
    fontSize: "32px",
    fontWeight: "700",
    lineHeight: "120%;",
    margin: "0",
    padding: 0,
  },
  "& .MuiTypography-body1": {
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "150%;",
    margin: 0,
    padding: 0,
  },
  "& .MuiTypography-body2": {
    color: "#808898",
    fontSize: "14px",
    textAlign: "center",
    "& a": {
      color: "#808898",
    },
  },
  "& button": {
    padding: "12px 24px",
    borderRadius: "5px",
    border: "1px solid #0B0D17",
    background: "#FFF",
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: "150%;",
    color: "#0B0D17",
    textTransform: "initial",
    "&:hover": {
      background: "#F4F5F7",
      boxShadow: "0px 4px 8px 0px rgba(106, 71, 147, 0.10)",
      color: "#0B0D17",
    },
  },
});
