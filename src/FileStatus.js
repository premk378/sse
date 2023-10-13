import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Box,
  useSteps,
} from "@chakra-ui/react";
import React from "react";
import { Spinner } from "@chakra-ui/react";

const FileStatus = ({events}) => {
  const steps = [
    { title: "Upload", event: "upload" },
    { title: "Scan", event: "scan-start" },
    { title: "Complete", event: "complete" },
  ];
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const spinner = (
    <Spinner
      thickness="4px"
      speed="1.5s"
      emptyColor="gray.200"
      color="blue.500"
      size="md"
    />
  );
  return (
    <div>
      <Stepper size="lg" index={activeStep}>
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
      {JSON.stringify(events)}
    </div>
  );
};

export default FileStatus;
