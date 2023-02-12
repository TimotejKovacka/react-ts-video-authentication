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
  sequenceSecret: Array<number>;
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
  setFormData,
  setFormStep,
  sequenceSecret,
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
  const [dummyItems, setDummyItems] = useState<
    Array<Array<Object & { thumbnail: string }>>
  >([]);

  useEffect(() => {
    const fetchDummy = async () => {
      const { data } = await axios.get<DummyJson>(
        "https://dummyjson.com/products"
      );
      const dummyArr = [];
      for (let i = 0; i < 5; i++) {
        dummyArr.push(data.products.slice(i * 6, (i + 1) * 6));
      }
      setDummyItems(dummyArr);
    };
    fetchDummy();
  }, []);

  const handleWatchAuthenticationStepSubmit = (
    sequenceState: WatchAuthSequenceState
  ) => {
    console.log("Setting parents state");
    console.log(isEqual(sequenceSecret, sequenceState.sequence));
    if (isEqual(sequenceSecret, sequenceState.sequence)) {
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
    <div>
      {stepState.isSuccessful !== undefined ? (
        stepState.isSuccessful ? (
          <SuccessfulUnlock setFormStep={setFormStep} />
        ) : (
          <UnsuccessfulUnlock setFormStep={setFormStep} />
        )
      ) : (
        <div className='grid grid-cols-3 grid-rows-2 grid-flow-row gap-5'>
          {dummyItems.length > 0 && (
            <WatchAuthSequence
              items={dummyItems}
              parentState={stepState}
              setParentState={handleWatchAuthenticationStepSubmit}
            />
          )}
        </div>
      )}
      {/* <MultiStepProgressBar step={authState.step} numberOfSteps={4} /> */}
    </div>
  );
};

export default WatchAuthentication;
