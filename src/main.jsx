import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import App from "./App.jsx";
import { EventProvider } from "./context/EventContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <EventProvider>
          <App />
        </EventProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);