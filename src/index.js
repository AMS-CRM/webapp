import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <>
    <Provider store={store}>
      <MantineProvider
        theme={{
          primaryColor: "dark",
          defaultRadius: 4,
          primaryShade: 6,
          fontFamily: "Poppins",
          components: {
            Container: {
              defaultProps: {
                sizes: {
                  xs: 540,
                  sm: 720,
                  md: 1016,
                  lg: 1140,
                  xl: 1488,
                },
              },
            },
          },
        }}
      >
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
