import { InputBase, styled } from "@mui/material";

export const Simpleinput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: "6px",
    border: "1px solid var(--grindery-light-mode-light-grey, #DCDCDC)",
    background: "var(--grindery-light-mode-bleach-grey, #F4F5F7)",
    position: "relative",
    fontSize: "16px",
    lineHeight: "100%",
    fontWeight: "400",
    padding: "13.5px 16px",
    height: "auto",
    "&:hover": {
      border: "1px solid var(--grindery-light-mode-middle-grey, #979797)",
    },
    "&:focus": {
      borderColor: "#0057FF",
      boxShadow: "inset 0px 0px 0px 1px #0057FF",
    },
  },
  "&.Mui-error": {
    "& .MuiInputBase-input": {
      borderColor: "#FF5858",
      boxShadow: "inset 0px 0px 0px 1px #FF5858",
    },
  },
}));
