import {
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Box,
  useSteps,
  Flex,
  Button,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import moment from "moment";
import { DeleteIcon, DownloadIcon } from "@chakra-ui/icons";

const FileStatus = ({ events }) => {
  const [clamAVStatus, setCLamAVStatus] = useState(null);
  const [actualMime, setActualMime] = useState(null);
  const [detectedMime, setDetectedMIme] = useState(null);
  const [complete, setComplete] = useState(null);
  const [url, setUrl] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const steps = [
    { title: "Upload", event: "upload" },
    { title: "Waiting for Scan", event: "waiting" },
    { title: "Scanning", event: "scan-start" },
    { title: "Complete", event: "complete" },
  ];
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  useEffect(() => {
    let currentStatus = null;
    if (events && events.length) {
      const lastEvent = events[events.length - 1];
      currentStatus = lastEvent.fileStatus;
      if (currentStatus === "complete") {
        setComplete(true);
        setActiveStep(steps.length);
        setCLamAVStatus(lastEvent.clamAVStatus);
        setActualMime(lastEvent.actualMime);
        setDetectedMIme(lastEvent.receivedMime);
        setUrl(lastEvent.signedUrl);
      } else {
        let idx = steps.findIndex((step) => step.event === currentStatus);
        if (idx === -1) idx = 0;
        setActiveStep(idx);
      }
    }
  }, [events.length]);

  const spinner = (
    <Spinner
      thickness="4px"
      speed="1.5s"
      emptyColor="gray.200"
      color="blue.500"
      size="sm"
    />
  );
  return (
    <div>
      <Stepper size="md" index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={spinner}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Flex
        justifyContent="flex-end"
        color="blue"
        fontSize="11px"
        textDecoration="underline"
        cursor="pointer"
        onClick={() => setShowDetails(!showDetails)}
      >
        {!showDetails && <span>Show Details</span>}
        {showDetails && <span>Hide Details</span>}
      </Flex>
      {showDetails && (
        <Box mt="8px">
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>TIME</Th>
                  <Th>STATUS</Th>
                  <Th>MESSAGE</Th>
                </Tr>
              </Thead>
              <Tbody>
                {events &&
                  events.map((ev, idx) => {
                    return (
                      <Tr key={idx}>
                        <Td>
                          {moment(ev.dateTime).format("DD MMM YY, h:mm:ss a")}
                        </Td>
                        <Td>{ev.message}</Td>
                        <Td>{ev.subject}</Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
          {complete && (
            <Flex alignItems="center" pl="10px" mt="10px" justifyContent='space-between'>
              <Box>
                <Flex gap="4px" fontSize='13px'>
                  <Flex fontWeight="bold">ClamAV Status: </Flex>
                  <Flex color='#5c5c5c'>{clamAVStatus}</Flex>
                </Flex>
                <Flex gap="4px" fontSize='13px'>
                  <Flex fontWeight="bold">Recieved Mime: </Flex>
                  <Flex color='#5c5c5c'>{detectedMime}</Flex>
                </Flex>
                <Flex gap="4px" fontSize='13px'>
                  <Flex fontWeight="bold">Actual Mime: </Flex>
                  <Flex color='#5c5c5c'>{actualMime}</Flex>
                </Flex>
              </Box>
              <Box>
              {url !== null && <Button colorScheme='green' variant='solid'><a href={url} target='_blank'><DownloadIcon></DownloadIcon></a></Button>}
              {!url && <Button colorScheme='red' variant='solid'><DeleteIcon></DeleteIcon></Button>}
              </Box>
            </Flex>
          )}
        </Box>
      )}
    </div>
  );
};

export default FileStatus;
