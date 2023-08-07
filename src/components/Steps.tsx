import { Stack, styled } from "@mui/material";

export const Steps = styled(Stack)({
  color: "#0B0C0E",
  maxWidth: "400px",
  margin: "0 auto",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "flex-start",
  flexWrap: "nowrap",
  gap: "16px",
  "& h3": {
    fontSize: "20px",
    fontWeight: "700",
    lineHeight: "120%;",
    margin: 0,
    padding: 0,
  },
  "& p": {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "150%;",
    margin: 0,
    padding: 0,
  },
  "& ul": {
    listStyle: "none",
    counterReset: "item",
    margin: 0,
    padding: 0,
    "& li": {
      counterIncrement: "item",
      marginBottom: "4px",
      padding: 0,
      "&:last-child": {
        marginBottom: 0,
      },
      "&:before": {
        marginRight: "10px",
        content: "counter(item)",
        background: "#EA5230",
        borderRadius: "100%",
        color: "white",
        width: "16px",
        textAlign: "center",
        display: "inline-block",
        fontSize: "12px",
        fontWeight: "700",
        lineHeight: "16px",
        position: "relative",
        top: "-1px",
      },
    },
  },
});
