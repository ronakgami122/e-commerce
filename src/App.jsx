import React from "react";
import Routing from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import CustomLoader from "./shared/CustomLoader";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<CustomLoader fullScreen />} persistor={persistor}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
