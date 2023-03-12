import React from "react";

interface WatchAuthCardProps {
  data: { title: string; poster_url: string };
  onClick: () => void;
}

const WatchAuthCard = ({ data, onClick }: WatchAuthCardProps) => {
  return (
    <>
      <div className='cursor-pointer w-full' onClick={onClick}>
        <img title='Auth Image' src={data.poster_url} className='h-full' />
      </div>
    </>
  );
};

// const WatchAuthCard = ({ data, onClick }: WatchAuthCardProps) => {
//   return (
//     <>
//       <div
//         className='cursor-pointer w-[200px] h-[300px] bg-cover bg-center'
//         onClick={onClick}
//         style={{ backgroundImage: `url("${data.poster_url}")` }}
//       >
//         {/* <img title="Auth Image" src={data.thumbnail} className="bg-contain" /> */}
//       </div>
//     </>
//   );
// };

export default WatchAuthCard;
