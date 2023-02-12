import { CheckCircleIcon } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface SuccessfulUnlockProps {
  setFormStep: Dispatch<SetStateAction<number>>;
}

const SuccessfulUnlock = ({ setFormStep }: SuccessfulUnlockProps) => {
  return (
    <div>
      <div className="flex flex-col">
        <CheckCircleIcon className="text-success" size={"xl"} />
        <h1 className="text-4xl text-white">Successful Unlock</h1>
      </div>
      <div className="float-right mt-4">
        <button
          onClick={() => setFormStep((step) => step + 1)}
          className="text-white border-primary border-2 rounded-md hover:bg-primary transition-colors font-semibold px-3 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SuccessfulUnlock;
