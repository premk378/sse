import { ChakraProvider } from "@chakra-ui/react";
import "./App.scss";
import NotificationsAdvanced from "./NotificationsAdvanced";
import { Provider } from "react-redux";
import store from "./store";
import DropFileInput from "./drop-file-input/DropFileInput";

function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <div className="wrapper">
          <div className="container">
            <DropFileInput></DropFileInput>
            <NotificationsAdvanced></NotificationsAdvanced>
          </div>
        </div>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
