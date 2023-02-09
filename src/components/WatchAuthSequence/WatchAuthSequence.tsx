import React, { useEffect, useRef, useState } from "react";
import WatchAuthCard from "../WatchAuthCard/WatchAuthCard";

interface WatchAuthSequenceProps {
  items: Array<Object & { thumbnail: string }>;
}

interface WatchAuthSequenceState {
  sequenceStep: number;
  sequence: Array<number>;
  individualTimes: Array<number>;
  sequenceTime: number | undefined;
}

const WatchAuthSequence = ({ items }: WatchAuthSequenceProps) => {
  const startSequenceTime = useRef<number>(0);
  const lastClickTime = useRef<number>(0);
  const [sequenceState, setSequenceState] = useState<WatchAuthSequenceState>({
    sequenceStep: 0,
    sequence: [],
    individualTimes: [],
    sequenceTime: undefined,
  });
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
    startSequenceTime.current = new Date().getTime();
    lastClickTime.current = new Date().getTime();
  }, []);

  useEffect(() => {
    if (sequenceState.sequenceStep === sequenceLength - 1) {
      // call setParentState
    }
  }, [sequenceState]);
  return (
    <>
      {items.map((item, index) => (
        <WatchAuthCard onClick={() => handleCardClick(index)} data={item} />
      ))}
    </>
  );
};

export default WatchAuthSequence;
