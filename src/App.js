import { ChakraProvider } from "@chakra-ui/react";
import "./App.scss";
import FileUpload from "./FileUpload";
import Notifications from "./Notifications";
import NotificationsAdvanced from "./NotificationsAdvanced";
import { Provider } from "react-redux";
import store from "./store";

function App() {

  return (
    <ChakraProvider>
      <Provider store={store}>
        <div className="container">
          <FileUpload></FileUpload>
          {/* <Notifications></Notifications> */}
          <NotificationsAdvanced></NotificationsAdvanced>
        </div>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
