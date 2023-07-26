import React from "react";
import { Column } from "./Column";
import { Form } from "./Form";
import { Alert, Button } from "@mui/material";
import { STATUS, selectAppStore, useAppSelector } from "../store";
import { useAppController } from "../controllers/AppController";
import { STATUS_DETAILS } from "../config";
import { EmailForm } from "./EmailForm";
import { ConsentMessage } from "./ConsentMessage";
import { Title } from "./Title";
import { WorkspaceForm } from "./WorkspaceForm";

type Props = {};

export const RightColumn = (props: Props) => {
  const { status, error, isLoading } = useAppSelector(selectAppStore);
  const { handleConnectMetaMaskClick, handleEmailConfirmedClick } =
    useAppController();

  const renderContentByStatus = () => {
    switch (status) {
      case STATUS.WAITING_EMAIL:
        return (
          <>
            <Title
              title="Seems like you are new to Grindery"
              description="Please provide your email address so we can activate your account."
            />
            <EmailForm />
          </>
        );
      case STATUS.WAITING_EMAIL_CONFIRMATION:
        return (
          <>
            <Title
              title="Confirm your email"
              description={STATUS_DETAILS[status].text}
            />
            <Button
              fullWidth
              onClick={handleEmailConfirmedClick}
              disabled={isLoading}
            >
              Continue
            </Button>
          </>
        );
      case STATUS.WAITING_WORKSPACE:
        return (
          <>
            <Title title="Select workspace" />
            <WorkspaceForm />
          </>
        );
      case STATUS.ERROR:
        return (
          <>
            <Title
              title="Join us or log in"
              description="Connect MetaMask wallet to create a new account or to log into your existing one."
            />
            <Button
              fullWidth
              startIcon={<img src="/images/metamask.svg" alt="MetaMask icon" />}
              onClick={handleConnectMetaMaskClick}
              disabled={isLoading}
            >
              Continue with MetaMask
            </Button>

            <Alert
              severity="error"
              sx={{
                borderRadius: "5px",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {error}
            </Alert>
          </>
        );
      case STATUS.UNAUTHENTICATED:
        return (
          <>
            <Title
              title="Join us or log in"
              description="Connect MetaMask wallet to create a new account or to log into your existing one."
            />
            <Button
              fullWidth
              startIcon={<img src="/images/metamask.svg" alt="MetaMask icon" />}
              onClick={handleConnectMetaMaskClick}
              disabled={isLoading}
            >
              Continue with MetaMask
            </Button>
            {status !== STATUS.UNAUTHENTICATED && (
              <Alert
                severity={STATUS_DETAILS[status].severity}
                sx={{
                  borderRadius: "5px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                {status === STATUS.ERROR ? error : STATUS_DETAILS[status].text}
              </Alert>
            )}
          </>
        );
      default:
        return (
          <>
            <Title
              title="Join us or log in"
              description="Connect MetaMask wallet to create a new account or to log into your existing one."
            />

            <Alert
              severity={STATUS_DETAILS[status].severity}
              sx={{
                borderRadius: "5px",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {STATUS_DETAILS[status].text}
            </Alert>
          </>
        );
    }
  };

  return (
    <Column sx={{ background: "#fff" }}>
      <Form>
        {renderContentByStatus()}
        <ConsentMessage />
      </Form>
    </Column>
  );
};
