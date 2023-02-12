import React, { useEffect, useRef, useState } from "react";
import WatchAuthCard from "../WatchAuthCard/WatchAuthCard";
import { WatchAuthenticationState } from "../WatchAuthentication";

interface WatchAuthSequenceProps {
  items: Array<Array<Object & { thumbnail: string }>>;
  parentState: WatchAuthenticationState;
  setParentState: (sequenceState: WatchAuthSequenceState) => void;
}

export interface WatchAuthSequenceState {
  sequenceStep: number;
  sequence: Array<number>;
  individualTimes: Array<number>;
  sequenceTime: number | undefined;
}

const initialState: WatchAuthSequenceState = {
  sequenceStep: 0,
  sequence: [],
  individualTimes: [],
  sequenceTime: undefined,
};

const WatchAuthSequence = ({
  items,
  parentState,
  setParentState,
}: WatchAuthSequenceProps) => {
  const startSequenceTime = useRef<number>(0);
  const lastClickTime = useRef<number>(0);
  const [sequenceState, setSequenceState] =
    useState<WatchAuthSequenceState>(initialState);
  const sequenceLength: number = 5;
  const numberOfCards: number = 6;

  const handleCardClick = (cardIndex: number) => {
    const timeNow: number = new Date().getTime();
    const timeFromLastClick: number = timeNow - lastClickTime.current;
    lastClickTime.current = timeNow;
    if (cardIndex > numberOfCards - 1) return;
    if (sequenceState.sequenceStep === sequenceLength - 1) {
      // Last item in sequence clicked
      setSequenceState((state) => ({
        sequenceStep: state.sequenceStep + 1,
        sequence: [...state.sequence, cardIndex],
        individualTimes: [...state.individualTimes, timeFromLastClick],
        sequenceTime: timeNow - startSequenceTime.current,
      }));

      return;
    }
    setSequenceState((state) => ({
      ...state,
      sequenceStep: state.sequenceStep + 1,
      sequence: [...state.sequence, cardIndex],
      individualTimes: [...state.individualTimes, timeFromLastClick],
    }));
  };

  useEffect(() => {
    // On initial component mount get current time
    const timeNow: number = new Date().getTime();
    startSequenceTime.current = timeNow;
    lastClickTime.current = timeNow;
  }, []);

  useEffect(() => {
    if (sequenceState.sequenceTime) {
      // Set Parent State and reset current state to initial
      setParentState(sequenceState);
      setSequenceState(initialState);
      const timeNow: number = new Date().getTime();
      startSequenceTime.current = timeNow;
      lastClickTime.current = timeNow;
    }
  }, [sequenceState]);

  console.log(sequenceState);
  return (
    <>
      {sequenceState.sequenceTime ? (
        <></>
      ) : (
        sequenceState.sequenceStep <= items.length &&
        items[sequenceState.sequenceStep].map((item, index) => (
          <WatchAuthCard onClick={() => handleCardClick(index)} data={item} />
        ))
      )}
    </>
  );
};

export default WatchAuthSequence;
