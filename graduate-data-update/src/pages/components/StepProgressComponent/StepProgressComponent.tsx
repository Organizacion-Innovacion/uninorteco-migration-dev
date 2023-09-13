import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  StepProgress,
  StepLabel,
  Step,
  Typography,
} from "@ellucian/react-design-system/core";
import { withStyles } from "@ellucian/react-design-system/core/styles";
import SectionOneComponent from "../sectionOneComponent/SectionOneComponent";
import { stylesStepProgress } from "./StepProgressComponentStyles";

type ClassesType = {
  sectionHeaders: string;
  root: string;
  button: string;
  stepProgressContent: string;
  stepProgressContentContainer: string;
};

const getSteps = () => ["Información personal", "Estado laboral", "Direcciones"];

const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <SectionOneComponent />;
    case 1:
      return "Content of Estado laboral";
    case 2:
      return "Content of Direcciones";
    default:
      return "true";
  }
};

const StepProgressComponent: React.FC<{ classes: ClassesType }> = ({ classes }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = getSteps();

  return (
    <div className={classes.root}>
      <StepProgress activeStep={activeStep} alternativeLabel>
        {steps.map((label) => {
          const props = {};
          const labelProps = {};
          return (
            <Step key={label} {...props}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </StepProgress>
      <div>
        {activeStep === steps.length ? (
          <div className={classes.stepProgressContentContainer}>
            <Typography className={classes.stepProgressContent}>
              All steps completed - you are finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div className={classes.stepProgressContentContainer}>
            <Typography className={classes.stepProgressContent}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                color="secondary"
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Atras
              </Button>
              <Button color="primary" onClick={handleNext} className={classes.button}>
                {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

StepProgressComponent.propTypes = {
  classes: PropTypes.shape({
    sectionHeaders: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    stepProgressContent: PropTypes.string.isRequired,
    stepProgressContentContainer: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(stylesStepProgress)(StepProgressComponent);
