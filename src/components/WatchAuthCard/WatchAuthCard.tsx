import React from "react";

interface WatchAuthCardProps {
  data: Object & { thumbnail: string };
  onClick: () => void;
}

const WatchAuthCard = ({ data, onClick }: WatchAuthCardProps) => {
  return (
    <>
      <div className='cursor-pointer' onClick={onClick}>
        <img title='Auth Image' src={data.thumbnail} />
      </div>
    </>
  );
};

export default WatchAuthCard;
