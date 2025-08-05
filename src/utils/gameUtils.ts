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

// Create random color
export const getRandomColor = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

// Check if player exists
export const isPlayerExists = (players: Player): boolean => {
  return players.player1 !== '' && players.player2 !== '';
};

// Check if player is rank 1
export const isRank1 = (rank: number): boolean => {
  return rank === 1;
};
