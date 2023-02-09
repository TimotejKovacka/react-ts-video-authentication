import React, { Dispatch, SetStateAction } from "react";

interface SuccessfulUnlockProps {
  setFormStep: Dispatch<SetStateAction<number>>;
}

const SuccessfulUnlock = ({ setFormStep }: SuccessfulUnlockProps) => {
  return (
    <div>
      SuccessfulUnlock
      <button onClick={() => setFormStep((step) => step + 1)}>Next</button>
    </div>
  );
};

export default SuccessfulUnlock;
