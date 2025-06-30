import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import {store} from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
  <Provider store={store}>
    <App />
  </Provider>
  </PersistGate>
);
