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

function getSteps() {
  return ["Template", "Details", "Preview"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Content of template";
    case 1:
      return "Content of details";
    case 2:
      return "Content of preview";
    default:
      return "true";
  }
}

const StepProgressComponent = (props) => {
  const { classes } = props;
  console.log(classes);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  // const [showLabels] = useState(true);

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    if (isStepSkipped(newActiveStep)) {
      const newSkipped = new Set(skipped);
      newSkipped.delete(newActiveStep);
      setSkipped(newSkipped);
    }
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    const newSkipped = new Set(skipped);
    newSkipped.add(activeStep);
    setActiveStep(activeStep + 1);
    setSkipped(newSkipped);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSkipped(new Set());
  };

  const steps = getSteps();

  return (
    <div className={classes.root} id={`${customId}_Container`}>
      <StepProgress activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const prop = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = "Optional";
          }
          if (isStepSkipped(index)) {
            prop.completed = false;
          }
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
              All steps completed - you&#39;re finished
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
              {isStepOptional(activeStep) && (
                <Button
                  color="secondary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}
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
