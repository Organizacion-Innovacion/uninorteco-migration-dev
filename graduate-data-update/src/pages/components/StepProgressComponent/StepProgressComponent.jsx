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
import { stylesStepProgress } from "./StepProgressComponentStyles";

const styles = stylesStepProgress;

const customId = "LinearHorizontalProgress";

const getSteps = () => ["Información personal", "Estado laboral", "Direcciones"];

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return "Content of Información personal";
    case 1:
      return "Content of Estado laboral";
    case 2:
      return "Content of Direcciones";
    default:
      return "true";
  }
};

const StepProgressComponent = ({ classes }) => {
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
    <div className={classes.root} id={`${customId}_Container`}>
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
                Back
              </Button>
              <Button color="primary" onClick={handleNext} className={classes.button}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

StepProgressComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepProgressComponent);
