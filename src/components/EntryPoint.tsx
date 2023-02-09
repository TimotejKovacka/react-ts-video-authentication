import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import { MultiStepFormProps } from "./MultiStepForm";

export interface EntryPointProps extends MultiStepFormProps {
  setFormStep: Dispatch<SetStateAction<number>>;
}

const EntryPoint = ({
  formData,
  setFormData,
  setFormStep,
}: EntryPointProps) => {
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);
  // const [values, setValues] = useState<Object>({})

  // const handleValuesChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setValues((values) => ({
  //     ...values,
  //     [e.target.name]: e.target.value
  //   }))
  // }

  const handleEntryPointSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // Maybe validate email
    // For now simple not empty check
    const target = e.target as typeof e.target & { email: { value: string } };
    const email = target.email.value;
    if (email.trim().length === 0) {
      setIsValid(false);
    } else {
      // call to onStepSubmit({isValid: isValid, values: values})
      // trigers FormStep
    }
  };

  return (
    <div>
      {/* Logo here */}
      <input
        type='text'
        placeholder='Email...'
        name='email'
        // onChange={handleValuesChange}
      />
      <button type='button' onClick={() => setFormStep((step) => step + 1)}>
        Start
      </button>
    </div>
  );
};

export default EntryPoint;
