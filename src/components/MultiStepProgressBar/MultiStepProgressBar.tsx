import { Line } from "rc-progress";
import React from "react";

interface MultiStepProgressBarProps {
  numberOfSteps: number;
  step: number;
}

const MultiStepProgressBar = ({
  numberOfSteps,
  step,
}: MultiStepProgressBarProps) => {
  return <Line percent={(100 / (numberOfSteps + 1)) * step} strokeWidth={4} />;
};

export default MultiStepProgressBar;
