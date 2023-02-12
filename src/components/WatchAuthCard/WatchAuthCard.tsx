import React from "react";

interface WatchAuthCardProps {
  data: Object & { thumbnail: string };
  onClick: () => void;
}

const WatchAuthCard = ({ data, onClick }: WatchAuthCardProps) => {
  return (
    <>
      <div
        className="cursor-pointer w-[200px] h-[300px] bg-cover bg-center"
        onClick={onClick}
        style={{ backgroundImage: `url("${data.thumbnail}")` }}
      >
        {/* <img title="Auth Image" src={data.thumbnail} className="bg-contain" /> */}
      </div>
    </>
  );
};

export default WatchAuthCard;
