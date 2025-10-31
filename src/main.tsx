import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { appStore } from "./store/appStore.ts";
import ClickSpark from "./components/ClickSpark.tsx";
import { ToastProvider } from "@/components/ui/toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={appStore}>
      <BrowserRouter>
        <ToastProvider>
          <ClickSpark
            sparkColor="#fff"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >
            <App />
          </ClickSpark>
        </ToastProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
