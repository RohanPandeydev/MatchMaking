import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContextWrapper } from "./contexts/Context.jsx";
import { ChatContextWrapper } from "./contexts/WebSocketContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ChatContextWrapper>
        <ContextWrapper>
          <App />
        </ContextWrapper>
      </ChatContextWrapper>
    </BrowserRouter>
  </QueryClientProvider>
);
