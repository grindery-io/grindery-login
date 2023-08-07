import {
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../store";
import { useAppController } from "../controllers/AppController";

type Props = {};

export const WorkspaceForm = (props: Props) => {
  const { isLoading, workspaces, workspace } = useAppSelector(selectAppStore);
  const dispatch = useAppDispatch();
  const { handleWorkspaceSubmitClick } = useAppController();

  return (
    <>
      <FormControl fullWidth>
        <Select
          style={{ background: "#fff" }}
          labelId="workpace-select-label"
          id="workpace-select"
          value={workspace}
          inputProps={{ "aria-label": "Without label" }}
          onChange={(event: SelectChangeEvent) => {
            dispatch(
              appStoreActions.setWorkspace(event.target.value as string)
            );
          }}
        >
          <MenuItem value={"personal"}>Personal workspace</MenuItem>
          {workspaces.map((workspace) => (
            <MenuItem key={workspace.key} value={workspace.key}>
              {workspace.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        fullWidth
        onClick={handleWorkspaceSubmitClick}
        disabled={isLoading}
      >
        Continue
      </Button>
    </>
  );
};
