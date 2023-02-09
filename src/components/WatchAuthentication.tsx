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
import WatchAuthSequence from "./WatchAuthSequence/WatchAuthSequence";

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

interface WatchAuthenticationState {
  isValid: boolean | undefined;
  isSuccessful: boolean | undefined;
  sequences: Array<Array<number>>;
  sequencesIndividualTimes: Array<Array<number>>;
  sequencesTimes: Array<number>;
}

const WatchAuthentication = ({
  setFormData,
  setFormStep,
  sequenceSecret,
}: WatchAuthenticationProps) => {
  const currentAttemptStartTime = useRef<number>(0);
  const lastClickStartTime = useRef<number>(0);
  const currentAttemptSequence = useRef<Array<number>>([]);
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

  const handleWatchAuthenticationStepSubmit = (sequenceState: any) => {
    if (sequenceState.sequence === sequenceSecret) {
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
    }
    // TODO
    if (stepState.sequences.length === maxNumberOfTries - 1) {
      // Go to next page
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

  return (
    <div>
      {/* <MultiStepProgressBar step={authState.step} numberOfSteps={4} /> */}
      <div className="grid grid-cols-3 grid-rows-2 grid-flow-row gap-5">
        <WatchAuthSequence
          items={}
          setParentState={handleWatchAuthenticationStepSubmit}
        />
      </div>
    </div>
  );
};

export default WatchAuthentication;
