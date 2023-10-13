import { ChakraProvider } from "@chakra-ui/react";
import "./App.scss";
import FileUpload from "./FileUpload";
import Notifications from "./Notifications";

function App() {
  return (
    <ChakraProvider>
      <div className="container">
        <FileUpload></FileUpload>
        <Notifications></Notifications>
      </div>
    </ChakraProvider>
  );
}

export default App;
