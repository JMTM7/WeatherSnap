import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { LanguageProvider } from "./context/LanguageProvider";
import App from "./App";
import store from "./state";
import ThemeProvider, { ThemedGlobalStyle } from "./theme";
import UserUpdater from "./state/user/updater";

// Root element where the application will be mounted
const container = document.getElementById("root");

// Render the React application into the root container
createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LanguageProvider>
          <UserUpdater />
          <ThemeProvider>
            <ThemedGlobalStyle />
            <App />
          </ThemeProvider>
        </LanguageProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
