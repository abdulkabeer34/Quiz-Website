import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./Store/Store";
import { Provider } from "react-redux";
import { ContextProvider } from "./Store/ContextApiStore";
import { PersistGate } from "redux-persist/integration/react";
// import { persistor,store } from "./Store/PersistorConfig";
import { persistor } from "./Store/PersistorConfig";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <ContextProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <ReactQueryDevtools />
        </PersistGate>
      </Provider>
    </ContextProvider>
  </QueryClientProvider>
);
