import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { LanguageProvider } from "./context/languageProvider";
import App from "./App";
import store from "./state";
import ThemeProvider, { ThemedGlobalStyle } from "./theme";

// Root element where the application will be mounted
const container = document.getElementById("root");

// Render the React application into the root container
createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LanguageProvider>
          <ThemeProvider>
            <ThemedGlobalStyle />
            <App />
          </ThemeProvider>
        </LanguageProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
