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

  const renderTitle = () => {
    switch (status) {
      case STATUS.WAITING_EMAIL:
        return (
          <Title
            title="Seems like you are new to Grindery"
            description="Please provide your email address so we can activate your account."
          />
        );
      case STATUS.WAITING_EMAIL_CONFIRMATION:
        return (
          <Title
            title="Confirm your email"
            description={STATUS_DETAILS[status].text}
          />
        );
      case STATUS.WAITING_WORKSPACE:
        return <Title title="Select workspace" />;
      default:
        return (
          <Title
            title="Join us or log in"
            description="Connect MetaMask wallet to create a new account or to log into your existing one."
          />
        );
    }
  };

  const renderContent = () => {
    switch (status) {
      case STATUS.WAITING_EMAIL:
        return <EmailForm />;
      case STATUS.WAITING_EMAIL_CONFIRMATION:
        return (
          <Button
            fullWidth
            onClick={handleEmailConfirmedClick}
            disabled={isLoading}
          >
            Continue
          </Button>
        );
      case STATUS.WAITING_WORKSPACE:
        return <WorkspaceForm />;
      case STATUS.ERROR:
        return (
          <Button
            fullWidth
            startIcon={<img src="/images/metamask.svg" alt="MetaMask icon" />}
            onClick={handleConnectMetaMaskClick}
            disabled={isLoading}
          >
            Continue with MetaMask
          </Button>
        );
      case STATUS.UNAUTHENTICATED:
        return !window.ethereum ? (
          <Alert
            severity="error"
            sx={{
              borderRadius: "5px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            An injected Ethereum provider such as{" "}
            <a
              href="https://metamask.io/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#d32f2f" }}
            >
              MetaMask
            </a>{" "}
            is needed to authenticate.
          </Alert>
        ) : (
          <Button
            fullWidth
            startIcon={<img src="/images/metamask.svg" alt="MetaMask icon" />}
            onClick={handleConnectMetaMaskClick}
            disabled={isLoading}
          >
            Continue with MetaMask
          </Button>
        );
      default:
        return null;
    }
  };

  const renderAlert = () => {
    switch (status) {
      case STATUS.WAITING_EMAIL:
        return null;
      case STATUS.WAITING_EMAIL_CONFIRMATION:
        return null;
      case STATUS.WAITING_WORKSPACE:
        return null;
      case STATUS.ERROR:
        return (
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
        );
      case STATUS.UNAUTHENTICATED:
        return null;
      default:
        return (
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
        );
    }
  };

  const renderConsent = () => {
    switch (status) {
      default:
        return <ConsentMessage />;
    }
  };

  return (
    <Column
      sx={{
        background: "#fff",
      }}
    >
      <Form>
        {renderTitle()}
        {renderContent()}
        {renderAlert()}
        {renderConsent()}
      </Form>
    </Column>
  );
};
