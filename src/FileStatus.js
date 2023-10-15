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

const FileStatus = ({ events }) => {
  const [showDetails, setShowDetails] = useState(false);
  const steps = [
    { title: "Upload", event: "upload" },
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
      currentStatus = events[events.length - 1].event;
      if(currentStatus === 'complete') {
        setActiveStep(steps.length);
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
      <Stepper size="sm" index={activeStep}>
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
      <Flex justifyContent='flex-end' color='blue' fontSize='11px' textDecoration='underline' cursor='pointer' onClick={() => setShowDetails(!showDetails)}>
        {!showDetails && <span>Show Details</span>}
        {showDetails && <span>Hide Details</span>}
      </Flex>
      {showDetails && <Box mt="8px">
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>TIME</Th>
                <Th>STATUS</Th>
                <Th>ACTION</Th>
              </Tr>
            </Thead>
            <Tbody>
              {events &&
                events.map((ev, idx) => {
                  return (
                    <Tr key={idx}>
                      <Td>{ev.time}</Td>
                      <Td>{ev.message}</Td>
                      <Td></Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>}
    </div>
  );
};

export default FileStatus;
