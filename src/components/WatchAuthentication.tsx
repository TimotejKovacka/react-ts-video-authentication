import axios from "axios";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { MultiStepFormProps } from "./MultiStepForm";
import MultiStepProgressBar from "./MultiStepProgressBar/MultiStepProgressBar";
import SuccessfulUnlock from "./SuccessfulUnlock";
import UnsuccessfulUnlock from "./UnsuccessfulUnlock";
import WatchAuthSequence, {
  WatchAuthSequenceState,
} from "./WatchAuthSequence/WatchAuthSequence";
import { isEqual } from "lodash";

export interface WatchAuthenticationProps extends MultiStepFormProps {
  setFormStep: Dispatch<SetStateAction<number>>;
}

type DummyJson = {
  products: Array<Object & { thumbnail: string }>;
  total: number;
  skip: number;
  limit: number;
};

export interface WatchAuthenticationState {
  isValid: boolean | undefined;
  isSuccessful: boolean | undefined;
  sequences: Array<Array<number>>;
  sequencesIndividualTimes: Array<Array<number>>;
  sequencesTimes: Array<number | undefined>;
}

const WatchAuthentication = ({
  formData,
  setFormData,
  setFormStep,
}: WatchAuthenticationProps) => {
  const [stepState, setStepState] = useState<WatchAuthenticationState>({
    isValid: undefined,
    isSuccessful: undefined,
    sequences: [],
    sequencesTimes: [],
    sequencesIndividualTimes: [],
  });
  const maxNumberOfTries: number = 5;
  //
  // const [dummyItems, setDummyItems] = useState<
  //   Array<Array<Object & { thumbnail: string }>>
  // >([]);

  const handleWatchAuthenticationStepSubmit = (
    sequenceState: WatchAuthSequenceState
  ) => {
    console.log("Setting parents state");
    console.log(isEqual(formData.authSequence, sequenceState.sequence));
    if (isEqual(formData.authSequence, sequenceState.sequence)) {
      setStepState((state) => ({
        isValid: true,
        isSuccessful: true,
        sequences: [...state.sequences, sequenceState.sequence],
        sequencesTimes: [...state.sequencesTimes, sequenceState.sequenceTime],
        sequencesIndividualTimes: [
          ...state.sequencesIndividualTimes,
          sequenceState.individualTimes,
        ],
      }));
      return;
    }
    if (stepState.sequences.length === maxNumberOfTries - 1) {
      setStepState((state) => ({
        isValid: false,
        isSuccessful: false,
        sequences: [...state.sequences, sequenceState.sequence],
        sequencesTimes: [...state.sequencesTimes, sequenceState.sequenceTime],
        sequencesIndividualTimes: [
          ...state.sequencesIndividualTimes,
          sequenceState.individualTimes,
        ],
      }));
      return;
    }
    setStepState((state) => ({
      ...state,
      isValid: false,
      sequences: [...state.sequences, sequenceState.sequence],
      sequencesTimes: [...state.sequencesTimes, sequenceState.sequenceTime],
      sequencesIndividualTimes: [
        ...state.sequencesIndividualTimes,
        sequenceState.individualTimes,
      ],
    }));
  };
  console.log(stepState);
  return (
    <>
      {stepState.isSuccessful !== undefined ? (
        stepState.isSuccessful ? (
          <SuccessfulUnlock setFormStep={setFormStep} />
        ) : (
          <UnsuccessfulUnlock setFormStep={setFormStep} />
        )
      ) : (
        <div className='h-screen container'>
          <div className='grid grid-cols-3 grid-rows-3 grid-flow-row gap-5 px-4 h-full'>
            {formData.sequenceData.length > 0 && (
              <WatchAuthSequence
                items={formData.sequenceData}
                parentState={stepState}
                setParentState={handleWatchAuthenticationStepSubmit}
              />
            )}
          </div>
        </div>
        // <MultiStepProgressBar step={authState.step} numberOfSteps={4} />
      )}
    </>
  );
};

export default WatchAuthentication;
