import { PLAYER_X } from '@/constants';
import { Player } from '@/types';

// get player color classes
export const getPlayerColorClass = (player: string, currentPlayer: string): string => {
  return player === currentPlayer ? 'text-blue-600' : 'text-red-600';
};

// get current player name
export const getCurrentPlayerName = (currentPlayer: string, players: Player): string => {
  return currentPlayer === PLAYER_X ? players.player1 : players.player2;
};
