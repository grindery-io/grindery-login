import React from "react";
import { selectAppStore, useAppSelector } from "../store";
import { Box } from "@mui/material";
import GrinderyTemplatesAppContent from "./GrinderyTemplatesAppContent";

type Props = {};

const AppSpecificContent = (props: Props) => {
  const { redirect } = useAppSelector(selectAppStore);
  const renderContent = () => {
    if (redirect.includes("templates.grindery.io")) {
      return <GrinderyTemplatesAppContent />;
    }
    return null;
  };
  return <Box>{renderContent()}</Box>;
};

export default AppSpecificContent;
