import { Crown, UserRound } from 'lucide-react';
import { isRank1 } from '@/utils';

interface PlayerCardProps {
  bgColor: string;
  rank: number;
  playerName: string;
  points: number;
  borderColor: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  bgColor,
  rank,
  playerName,
  points,
  borderColor,
}) => {
  return (
    <div className={`flex flex-col items-center ${isRank1(rank) ? 'mb-[8rem]' : ''}`}>
      <div
        style={{ backgroundColor: bgColor }}
        className={`w-20 h-20 rounded-full flex items-center text-bold justify-center border-2 border-white relative`}
      >
        {isRank1(rank) && (
          <span className='absolute top-[-18px] left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Crown className='w-12 h-12 text-yellow-500' />
          </span>
        )}
        <UserRound className='w-12 h-12 text-white' />
        <span
          className={`absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 bg-white text-black px-2 py-1 rounded-full text-xs font-bold ${borderColor} shadow-lg`}
        >
          {rank}
        </span>
      </div>
      <div className='mt-5 text-center'>
        <h2 className='text-md font-bold text-gray-800'>{playerName}</h2>
        <p className='text-sm text-gray-500'>Total Points: {points}</p>
      </div>
    </div>
  );
};

export default PlayerCard;
