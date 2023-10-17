import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
} from "@chakra-ui/react";
import fileImg from "./assets/file.png";
import FileStatus from "./FileStatus";
import { useDispatch, useSelector } from "react-redux";
import { addFileEvent } from "./filesSlice";
import { HOSTNAME, NOTIFY_API } from "./constants";

const NotificationsAdvanced = () => {
  const files = useSelector((state) => state.files);
  const dispatch = useDispatch();
  const [listening, setListening] = useState(false);
  let eventSource = undefined;

  useEffect(() => {
    if (!listening) {
      eventSource = new EventSource(HOSTNAME + NOTIFY_API);

      eventSource.onopen = (event) => {
        console.log("connection opened");
      };

      eventSource.onmessage = (event) => {
        if (event.data) {
          const parsed = JSON.parse(event.data);
          console.log(parsed);
          let message = null;
          if(parsed.fileStatus === 'scan-start') {
            message = "Scan Started";
          } else if(parsed.fileStatus === 'complete') {
            message = "Scan Finished"
          } else {
            message = parsed.subject;
          }
          dispatch(addFileEvent({ id: parsed.id, ev: {...parsed, message: message} }));
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

  const getFileSize = (bytes) => {
    return Math.round(bytes/1024) + ' KB';
  }
  return (
    <div className="table-container">
      {!files?.length && <Box textAlign='center' mt='10px' fontSize='18px' fontWeight='600'>No files uploaded</Box>}
      {files?.length > 0 && <Accordion
        w="90%"
        border="1px solid #eee"
        borderRadius="8px"
        allowToggle
      >
        {files &&
          files.map((file) => {
            return (
              <AccordionItem key={file.id}>
                <h2>
                  <AccordionButton>
                    <Flex as='span' flex='1' alignItems='center'>
                      <img height='50' width='50' src={fileImg}></img>
                      <Box as="span" flex="1" textAlign="left">
                      <Box fontSize='13px' fontWeight='bold'>{file.filename}</Box>
                      <Box fontSize='11px' color='#555'>{getFileSize(file.size)}</Box>
                    </Box> 
                    </Flex>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <FileStatus events={file.events}></FileStatus>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
      </Accordion>}
    </div>
  );
};

export default NotificationsAdvanced;
