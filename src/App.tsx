import { useCallback, useState } from "react";
import "./App.css";
import EntryPoint from "./components/EntryPoint";
import MultiStepForm from "./components/MultiStepForm";
import PasswordStep from "./components/PasswordStep";
import WatchAuthentication from "./components/WatchAuthentication";

interface StepsInterface {
  label: string;
  isValid: boolean | undefined;
}

interface SecretData {
  password: string;
  authSequence: Array<number>;
}

export interface FormData extends SecretData {
  email: string;
}

function App() {
  // const [authStep, setAuthStep] = useState<number>(0);
  // const [email, setEmail] = useState<string>("");
  const [formState, setFormState] = useState<FormData>({
    email: "",
    password: "",
    authSequence: [],
  });
  // const stepComponents = [
  //   <EntryPoint />,
  //   <PasswordStep />,
  //   <WatchAuthentication />,
  // ];
  // const [steps, setSteps] = useState<Array<StepsInterface>>([
  //   {
  //     label: "Account Details",
  //     isValid: undefined,
  //   },
  //   {
  //     label: "Personal Details",
  //     isValid: undefined,
  //   },
  //   {
  //     label: "Payment Details",
  //     isValid: undefined,
  //   },
  // ]);
  // const lastStepIndex = steps.length - 1;
  // const isLastStep = lastStepIndex === authStep;
  // const isPreviousStepsValid =
  //   steps
  //     .slice(0, authStep)
  //     .findIndex((currentStep) => currentStep.isValid === false) === -1;
  // const onStepSubmit = useCallback((event) => {
  //   const { isValid, values } = event;
  //   const currentSteps = steps.map((currentStep, index) => ({
  //     ...currentStep,
  //     isValid: index === authStep ? isValid : currentStep.isValid,
  //   }));
  //   setSteps(currentSteps);
  //   setAuthStep((step) => Math.min(step + 1, lastStepIndex));
  //   setFormState(values);
  //   if (isLastStep && isPreviousStepsValid && isValid) {
  //     alert("finished");
  //   }
  // });

  return (
    <div className='App'>
      <MultiStepForm formData={formState} setFormData={setFormState} />
      {/* <WatchAuthentication formData={formState} setFormData={setFormState} /> */}
    </div>
  );
}

export default App;
