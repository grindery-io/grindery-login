import React from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormControl,
  Stack,
  Typography,
} from "@mui/material";
import { selectAppStore, useAppSelector } from "../store";
import { useAppController } from "../controllers/AppController";
import { ONBOARDING_FIELDS } from "../config";
import { Simpleinput } from "./SimpleInput";
import { CheckBox } from "./CheckBox";

type Props = {};

export const EmailForm = (props: Props) => {
  const { isLoading } = useAppSelector(selectAppStore);
  const [input, setInput] = React.useState<{ [key: string]: string[] }>({
    email: [""],
    skill: [] as string[],
    interest: [] as string[],
  });
  const [error, setError] = React.useState<string | null>(null);
  const { handleSubmitEmailClick } = useAppController();

  return (
    <>
      <FormControl variant="standard" sx={{ width: "100%" }}>
        <Simpleinput
          fullWidth
          name="email"
          type="email"
          id="email-input"
          placeholder="Enter your email"
          autoComplete="email"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setError(null);
            setInput({
              ...input,
              email: [event?.target.value],
            });
          }}
          error={Boolean(error)}
        />
      </FormControl>
      <Stack
        direction="column"
        alignItems="stretch"
        justifyContent="flex-start"
        flexWrap="nowrap"
        gap="16px"
        sx={{ textAlign: "left" }}
      >
        {Object.entries(ONBOARDING_FIELDS).map(([key, value]) => (
          <Box key={key}>
            <Typography
              style={{
                fontSize: "14px",
                lineHeight: "150%",
                textAlign: "left",
                color: "rgb(11, 13, 23)",
                fontStyle: "normal",
                fontWeight: "400",
                margin: "0 0 2px",
                padding: 0,
              }}
            >
              {value.title}
            </Typography>
            <Typography
              style={{
                fontSize: "12px",
                lineHeight: "150%",
                textAlign: "left",
                color: "rgb(11, 13, 23)",
                fontStyle: "normal",
                fontWeight: "400",
                margin: "0 0 10px",
                padding: 0,
              }}
            >
              {value.description}
            </Typography>
            {value.options.map((option) => (
              <Stack
                key={option.value}
                direction="row"
                alignItems="flex-start"
                justifyContent="flex-start"
                flexWrap="nowrap"
                gap="15px"
                mb="4px"
                tabIndex={0}
                onKeyDown={(event: React.KeyboardEvent) => {
                  if (event.key === "Enter") {
                    if (input[key].includes(option.value)) {
                      setInput({
                        ...input,
                        [key]: [
                          ...input[key].filter(
                            (i: string) => i !== option.value
                          ),
                        ],
                      });
                    } else {
                      setInput({
                        ...input,
                        [key]: [...input[key], option.value],
                      });
                    }
                  }
                }}
                onClick={() => {
                  if (input[key].includes(option.value)) {
                    setInput({
                      ...input,
                      [key]: [
                        ...input[key].filter((i: string) => i !== option.value),
                      ],
                    });
                  } else {
                    setInput({
                      ...input,
                      [key]: [...input[key], option.value],
                    });
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <CheckBox
                  checked={input[key].includes(option.value)}
                  onChange={() => {}}
                />
                <label
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "150%",
                    color: "#0b0d17",
                    cursor: "pointer",
                  }}
                >
                  {option.label}
                </label>
              </Stack>
            ))}
          </Box>
        ))}
      </Stack>
      {error && (
        <Alert severity="error" sx={{ width: "100%", boxSizing: "border-box" }}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <Button
        fullWidth
        onClick={() => {
          setError(null);
          if (input.email[0] === "") {
            setError("Email is required");
            return;
          }
          if (
            !input.email[0]
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )
          ) {
            setError("Email is invalid");
            return;
          }
          handleSubmitEmailClick(input);
        }}
        disabled={isLoading}
      >
        Continue
      </Button>
    </>
  );
};
