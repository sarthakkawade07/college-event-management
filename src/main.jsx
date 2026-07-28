import { EventProvider } from "./context/EventContext";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
 <EventProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</EventProvider>
);