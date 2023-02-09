import React, { Dispatch, SetStateAction } from "react";

interface UnsuccessfulUnlockProps {
  setFormStep: Dispatch<SetStateAction<number>>;
}

const UnsuccessfulUnlock = ({ setFormStep }: UnsuccessfulUnlockProps) => {
  return (
    <div>
      UnsuccessfulUnlock
      <button onClick={() => setFormStep((step) => step + 1)}>Next</button>
    </div>
  );
};

export default UnsuccessfulUnlock;
