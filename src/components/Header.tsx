import { Stack, styled } from "@mui/material";

export const Header = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "nowrap",
  gap: "16px",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "72px",
  padding: "0 24px",
  boxSizing: "border-box",
});
