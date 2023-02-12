import { XCircleIcon } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface UnsuccessfulUnlockProps {
  setFormStep: Dispatch<SetStateAction<number>>;
}

const UnsuccessfulUnlock = ({ setFormStep }: UnsuccessfulUnlockProps) => {
  return (
    <div>
      <div className="flex flex-col">
        <XCircleIcon className="text-error" size={"xl"} />
        <h1 className="text-4xl text-white">Unsuccessful Unlock</h1>
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

export default UnsuccessfulUnlock;
