import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import { MultiStepFormProps } from "./MultiStepForm";
import reactLogo from "../assets/react.svg";

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
    <div className="flex flex-col">
      <img src={reactLogo} alt="Logo" className="pb-12" />
      <form onSubmit={handleEntryPointSubmit} className="flex flex-col">
        <label htmlFor="email" className="text-left text-white">
          Email:
        </label>
        <input
          type="text"
          placeholder="Email..."
          name="email"
          className="mb-4 rounded-sm focus:ring focus:ring-primary focus:outline-none p-1"
          autoComplete="off"
        />
        <button
          type="button"
          onClick={() => setFormStep((step) => step + 1)}
          className="text-white border-primary border-2 rounded-md hover:bg-primary transition-colors font-semibold"
        >
          Start
        </button>
      </form>
    </div>
  );
};

export default EntryPoint;
