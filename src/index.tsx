import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";
import { Provider } from "react-redux";

import App from "./components/app/app";
import "./index.css";
import { store } from "./services/store";


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </Provider>
    </Router>
  </React.StrictMode>
);
