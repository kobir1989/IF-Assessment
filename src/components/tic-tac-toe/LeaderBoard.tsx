'use client';

import React from 'react';
import { Trophy, UserRound } from 'lucide-react';
import { getRandomColor, isRank1 } from '@/utils';
import { useAppDispatch, useGameStore } from '@/redux/hooks';
import PlayerCard from './PlayerCard';
import EmptyLeaderBoard from './EmptyLeaderboard';
import { Button } from '@/components/ui/Button';
import { resetLeaderboard } from '@/redux/features/ticTacToeSlice';
import { useRouter } from 'next/navigation';

const LeaderBoard = () => {
  const { leaderboard } = useGameStore();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClearLeaderboard = () => {
    dispatch(resetLeaderboard());
    if (typeof window !== 'undefined') {
      localStorage.removeItem('persist:root');
    }
    router.push('/assignment-1');
  };

  return (
    <>
      {leaderboard?.length > 0 ? (
        <div className='mt-20'>
          {leaderboard.length > 0 && (
            <div className='flex items-end justify-center sm:gap-10 gap-4 mb-6'>
              {leaderboard?.length > 1 && (
                <PlayerCard
                  bgColor={getRandomColor()}
                  rank={leaderboard[1].rank}
                  playerName={leaderboard[1].playerName}
                  points={leaderboard[1].totalPoints}
                  borderColor='border-orange-400'
                />
              )}

              <div className='transform translate-y-[-20px]'>
                <PlayerCard
                  bgColor={getRandomColor()}
                  rank={leaderboard[0].rank || 0}
                  playerName={leaderboard[0].playerName}
                  points={leaderboard[0].totalPoints}
                  borderColor='border-blue-400'
                />
              </div>

              {leaderboard?.length > 2 && (
                <PlayerCard
                  bgColor={getRandomColor()}
                  rank={leaderboard[2].rank}
                  playerName={leaderboard[2].playerName}
                  points={leaderboard[2].totalPoints}
                  borderColor='border-green-500'
                />
              )}
            </div>
          )}
          {leaderboard.map((player, index) => (
            <div className='mt-2 bg-gray-100 py-2 sm:px-10 px-4 rounded-full' key={index}>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-4'>
                    <div>
                      <p className='text-sm text-gray-800 font-bold'>{player.rank}</p>
                    </div>
                    <div
                      style={{ backgroundColor: getRandomColor() }}
                      className='w-10 h-10 rounded-full flex items-center justify-center'
                    >
                      <p className='text-white text-sm font-bold'>
                        <UserRound className='w-6 h-6 text-white' />
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    {isRank1(player.rank) && <Trophy className='w-4 h-4 text-yellow-500' />}
                    <p className='text-gray-800 text-sm font-bold'>{player.playerName}</p>
                  </div>
                </div>

                <div className='grid sm:grid-cols-4 grid-cols-2 gap-2 sm:gap-4'>
                  <p className='text-green-500 text-sm'>Win: {player.wins}</p>
                  <p className='text-red-500 text-sm'>Loss: {player.losses}</p>
                  <p className='text-blue-500 text-sm'>Tie: {player.ties}</p>
                  <p className='text-gray-800 text-sm'>Total: {player.totalPoints}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyLeaderBoard />
      )}
      {leaderboard?.length > 0 && (
        <div className='flex items-center justify-center mt-10'>
          <Button variant='outline' size='sm' onClick={handleClearLeaderboard}>
            Clear Leaderboard
          </Button>
        </div>
      )}
    </>
  );
};

export default LeaderBoard;
