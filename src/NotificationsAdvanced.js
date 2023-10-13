import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import FileStatus from "./FileStatus";
import { useDispatch, useSelector } from "react-redux";
import { addFileEvent } from "./filesSlice";

const NotificationsAdvanced = () => {
  const files = useSelector(state => state.files);
  const dispatch = useDispatch();
  const [listening, setListening] = useState(false);
  // const [data, setData] = useState([]);
  let eventSource = undefined;


  useEffect(() => {
    if (!listening) {
      eventSource = new EventSource("http://localhost:8081/notify");

      eventSource.onopen = (event) => {
        console.log("connection opened");
      };

      eventSource.onmessage = (event) => {
        if (event.data) {
          const parsed = JSON.parse(event.data);
          dispatch(addFileEvent({id: parsed.id, ev: parsed}));
        }
      };

      eventSource.onerror = (event) => {
        console.log(event.target.readyState);
        if (event.target.readyState === EventSource.CLOSED) {
          console.log("eventsource closed (" + event.target.readyState + ")");
        }
        eventSource.close();
      };

      setListening(true);
    }

    return () => {
      eventSource.close();
      console.log("eventsource closed");
    };
  }, []);

  return (
    <div className="table-container">
      <Accordion
        defaultIndex={[]}
        allowMultiple
        w="80%"
        border="1px solid #eee"
        borderRadius="8px"
      >
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Section 1 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <FileStatus></FileStatus>
          </AccordionPanel>
        </AccordionItem>
        {files &&
          files.map((file) => {
            return (
              <AccordionItem key={file.id}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      {file.filename}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <FileStatus events={file.events}></FileStatus>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
      </Accordion>
    </div>
  );
};

export default NotificationsAdvanced;
