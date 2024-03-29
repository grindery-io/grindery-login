import React from "react";
import { Provider as StoreProvider } from "react-redux";
import ConfigProvider from "./providers/ConfigProvider";
import AppController from "./controllers/AppController";
import { store } from "./store";
import {
  Columns,
  Header,
  LeftColumn,
  Logo,
  Page,
  RightColumn,
} from "./components";

function App() {
  return (
    <StoreProvider store={store}>
      <ConfigProvider>
        <AppController>
          <Page>
            <Header
              sx={{
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              <a
                href="https://www.grindery.com"
                target="_blank"
                rel="noreferrer"
              >
                <Logo src="/images/logo.svg" alt="Grindery logo" />
              </a>
            </Header>
            <Columns sx={{ flexDirection: { xs: "column", sm: "row" } }}>
              <LeftColumn />
              <RightColumn />
            </Columns>
          </Page>
        </AppController>
      </ConfigProvider>
    </StoreProvider>
  );
}

export default App;
