import React from "react";
import Routing from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
