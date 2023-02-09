import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { MultiStepFormProps } from "./MultiStepForm";
import SuccessfulUnlock from "./SuccessfulUnlock";
import UnsuccessfulUnlock from "./UnsuccessfulUnlock";

export interface PasswordStepProps extends MultiStepFormProps {
  setFormStep: Dispatch<SetStateAction<number>>;
  passwordSecret: string;
}

interface PasswordStepState {
  passwords: Array<string>;
  passwordsTimes: Array<number>;
  isValid: boolean | undefined;
  isSuccessful: boolean | undefined;
}

const PasswordStep = ({
  formData,
  setFormData,
  setFormStep,
  passwordSecret,
}: PasswordStepProps) => {
  const currentAttemptStartTime = useRef<number>(0);
  const [stepState, setStepState] = useState<PasswordStepState>({
    passwords: [],
    passwordsTimes: [],
    isValid: undefined,
    isSuccessful: undefined,
  });
  const maxNumberOfTries: number = 5;

  const handlePasswordStepSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Time
    const timeNow: number = new Date().getTime();
    const attemptTime: number = timeNow - currentAttemptStartTime.current;
    const target = e.target as typeof e.target & {
      password: { value: string };
    };
    const password: string = target.password.value;
    // Check against Secret
    if (password !== passwordSecret) {
      if (stepState.passwords.length === maxNumberOfTries - 1) {
        // This was the last attempt
        // display UnsuccessfulUnlock
        setStepState((state) => ({
          isSuccessful: false,
          isValid: false,
          passwords: [...state.passwords, password],
          passwordsTimes: [...state.passwordsTimes, attemptTime],
        }));
        // call to onStepSubmit({isValid: stepState.isValid, values: {passwords: [...stepState.passwords, password], passwordsTimes: [...stepState.passwordsTimes, attemptTime]}})
      } else {
        setStepState((state) => ({
          ...state,
          isValid: false,
          passwords: [...state.passwords, password],
          passwordsTimes: [...state.passwordsTimes, attemptTime],
        }));
      }
    } else {
      // display SuccessfulUnlock
      setStepState((state) => ({
        isSuccessful: true,
        isValid: true,
        passwords: [...state.passwords, password],
        passwordsTimes: [...state.passwordsTimes, attemptTime],
      }));
      // call to onStepSubmit({isValid: stepState.isValid, values: {passwords: [...stepState.passwords, password], passwordsTimes: [...stepState.passwordsTimes, attemptTime]}})
    }
  };

  useEffect(() => {
    currentAttemptStartTime.current = new Date().getTime();
  }, []);

  useEffect(() => {
    if (stepState.isValid === false) {
      currentAttemptStartTime.current = new Date().getTime();
    }
  }, [stepState.isValid]);

  console.log(stepState);
  return (
    <div>
      {stepState.isSuccessful !== undefined ? (
        stepState.isSuccessful ? (
          <SuccessfulUnlock setFormStep={setFormStep} />
        ) : (
          <UnsuccessfulUnlock setFormStep={setFormStep} />
        )
      ) : (
        <form onSubmit={handlePasswordStepSubmit}>
          <input type='password' placeholder='Password...' name='password' />
          <button type='submit'>Submit</button>
        </form>
      )}
    </div>
  );
};

export default PasswordStep;
