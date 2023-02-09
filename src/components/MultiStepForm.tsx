import React, { Dispatch, SetStateAction, useState } from "react";
import EntryPoint from "./EntryPoint";
import PasswordStep from "./PasswordStep";
import WatchAuthentication from "./WatchAuthentication";
import { FormData } from "../App";
import EndPoint from "./EndPoint";

export interface MultiStepFormProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

interface Secrets {
  passwordSecret: string;
  sequenceSecret: Array<number>;
}

const MultiStepForm = ({ formData, setFormData }: MultiStepFormProps) => {
  const [formStep, setFormStep] = useState<number>(0);
  // Fetched secrets -> Currently dummy values
  const [secrets, setSecrets] = useState<Secrets>({
    passwordSecret: "hcs@2023",
    sequenceSecret: [0, 0, 0, 0, 0],
  });
  // Fetched video auth

  const conditionalComponent = () => {
    switch (formStep) {
      case 0:
        return (
          <EntryPoint
            formData={formData}
            setFormData={setFormData}
            setFormStep={setFormStep}
          />
        );
      case 1:
        return (
          <PasswordStep
            formData={formData}
            setFormData={setFormData}
            setFormStep={setFormStep}
            passwordSecret={secrets.passwordSecret}
          />
        );
      case 2:
        return (
          <WatchAuthentication
            formData={formData}
            setFormData={setFormData}
            setFormStep={setFormStep}
            sequenceSecret={secrets.sequenceSecret}
          />
        );
      case 3:
        return <EndPoint />;
      default:
        return <EndPoint />;
    }
  };
  return <div>{conditionalComponent()}</div>;
};

export default MultiStepForm;
