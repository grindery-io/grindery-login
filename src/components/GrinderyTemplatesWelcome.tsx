import React, { useCallback, useEffect, useState } from "react";
import GrinderyClient from "grindery-nexus-client";
import { selectAppStore, useAppSelector } from "../store";
import { Box, Stack, Typography } from "@mui/material";
import { Title } from "./Title";

type Props = {};

const GrinderyTemplatesWelcome = (props: Props) => {
  const { redirect } = useAppSelector(selectAppStore);
  const redirectParams = redirect.split("/");
  const triggerConnectorKey = redirectParams[3];
  const actionConnectorKey = redirectParams[4];
  const [triggerConnector, setTriggerConnector] = useState<any>(null);
  const [actionConnector, setActionConnector] = useState<any>(null);
  console.log("triggerConnectorKey", triggerConnectorKey);
  console.log("actionConnectorKey", actionConnectorKey);

  const getConnectors = useCallback(async () => {
    try {
      const client = new GrinderyClient();
      if (triggerConnectorKey) {
        const triggerConnectorCDS = await client.connector.get({
          driverKey: triggerConnectorKey,
        });
        if (triggerConnectorCDS) {
          setTriggerConnector(triggerConnectorCDS);
        }
      }
      if (actionConnectorKey) {
        const actionConnectorCDS = await client.connector.get({
          driverKey: actionConnectorKey,
        });
        if (actionConnectorCDS) {
          setActionConnector(actionConnectorCDS);
        }
      }
    } catch (error: any) {
      console.error("getConnectors error", error);
    }
  }, [triggerConnectorKey, actionConnectorKey]);

  useEffect(() => {
    getConnectors();
  }, [getConnectors]);

  return (
    <>
      <Box sx={{ minHeight: "178px", marginBottom: "20px" }}>
        {triggerConnector && (
          <>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              flexWrap="nowrap"
              sx={{
                marginBottom: "24px",
                "& img": {
                  width: "48px",
                  height: "48px",
                  display: "block",
                },
              }}
            >
              <Box
                sx={{
                  padding: "10px",
                  background: "#fff",
                  border: "1px solid rgb(220, 220, 220)",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={triggerConnector?.icon}
                  alt={`${triggerConnector.name} icon`}
                />
              </Box>
              {actionConnector && (
                <>
                  <Box
                    sx={{
                      position: "relative",
                      width: "68px",
                      height: "70px",
                    }}
                  >
                    <Box
                      sx={{
                        background: "rgb(220, 220, 220)",
                        position: "absolute",
                        left: 0,
                        top: "35px",
                        width: "100%",
                        height: "1px",
                      }}
                    />
                    <img
                      style={{
                        position: "absolute",
                        left: "24px",
                        top: "25px",
                        width: "20px",
                        height: "20px",
                        display: "block",
                      }}
                      src="https://www.grindery.io/hubfs/plus-icon.svg"
                      alt="plus icon"
                    />
                  </Box>

                  <Box
                    sx={{
                      padding: "10px",
                      background: "#fff",
                      border: "1px solid rgb(220, 220, 220)",
                      borderRadius: "8px",
                    }}
                  >
                    <img
                      src={actionConnector?.icon}
                      alt={`${actionConnector.name} icon`}
                    />
                  </Box>
                </>
              )}
            </Stack>
            <Typography
              style={{
                marginBottom: "32px",
                fontSize: "32px",
                fontWeight: "bold",
                textAlign: "center",
                color: "#000",
                lineHeight: "130%",
              }}
            >
              Connect
              <br />
              {triggerConnector.name} to {actionConnector?.name || "Apps/dApps"}
            </Typography>
          </>
        )}
      </Box>
      <Title
        title=""
        description="We are the easiest and fasted way for anyone to build and use
      autonomous agents to connect Apps and dApps"
      />
    </>
  );
};

export default GrinderyTemplatesWelcome;
