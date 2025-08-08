'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useGameStore } from '@/redux/hooks';
import Confetti from 'react-confetti';
import {
  setBoard,
  setCurrentPlayer,
  setWinner,
  completeRound,
  startNextRound,
  resetGame,
  resetGameSeries,
} from '@/redux/features/ticTacToeSlice';
import ScoreSection from '@/components/tic-tac-toe/ScoreSection';
import GameControlButtons from '@/components/tic-tac-toe/GameControlButtons';
import SeriesWinnerModal from '@/components/tic-tac-toe/SeriesWinnerModal';
import GameStatus from '@/components/tic-tac-toe/GameStatus';
import Game3x3Grid from '@/components/tic-tac-toe/Game3x3Grid';
import { PLAYER_X, PLAYER_O, WINNING_LINES, TIE, ROUTES } from '@/constants';
import { isPlayerExists } from '@/utils';
import { useConfetti } from '@/hooks';

const GameContainer = () => {
  const {
    players,
    currentPlayer,
    board,
    winner,
    currentRound,
    maxRounds,
    scores,
    gameSeriesWinner,
    isGameSeriesOver,
    roundWinner,
  } = useGameStore();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    showConfetti,
    confettiPieces,
    triggerRoundWinConfetti,
    triggerSeriesWinConfetti,
    stopConfetti,
  } = useConfetti();

  useEffect(() => {
    if (!isPlayerExists(players)) {
      router.push(ROUTES.assignment_1.game.playerSetup);
    }
  }, [players, router]);

  // Trigger confetti on round win
  useEffect(() => {
    if (winner && winner !== TIE) {
      triggerRoundWinConfetti();
    }
  }, [winner, triggerRoundWinConfetti]);

  // Trigger extra confetti on series win
  useEffect(() => {
    if (isGameSeriesOver && gameSeriesWinner && gameSeriesWinner !== TIE) {
      triggerSeriesWinConfetti();
    }
  }, [isGameSeriesOver, gameSeriesWinner, triggerSeriesWinConfetti]);

  // Check each winning line after each move
  const checkWinner = (board: (string | null)[]): string | null => {
    for (const line of WINNING_LINES) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    // Check if game is a tie
    if (board.every((cell) => cell !== null)) {
      return TIE;
    }

    return null;
  };

  const handleCellClick = (index: number) => {
    // Dont allow moves if game is over or cell has value
    if (winner || board[index] || isGameSeriesOver) {
      return;
    }
    // Replace the cell with the current player (X or O) fron null
    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    dispatch(setBoard(newBoard));
    // Check if there is a winner
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      dispatch(setWinner(gameWinner));
      // Complete the round when there is a winner
      dispatch(completeRound({ winner: gameWinner }));
    } else {
      // Switch player (X OR O)
      dispatch(setCurrentPlayer(currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X)); // X OR O
    }
  };

  const handleNextRound = () => {
    dispatch(startNextRound());
  };

  const handleResetGame = () => {
    dispatch(resetGame());
    stopConfetti();
  };

  const handleNewGameSeries = () => {
    dispatch(resetGameSeries());
    stopConfetti();
  };

  const handleResetSeries = () => {
    dispatch(resetGameSeries());
    stopConfetti();
  };

  const getRoundWinnerName = () => {
    if (roundWinner === PLAYER_X) return players.player1;
    if (roundWinner === PLAYER_O) return players.player2;
    if (roundWinner === TIE) return 'Tie';
    return null;
  };

  const hasWindow = () => typeof window !== 'undefined';

  return (
    <div className='w-full'>
      {/* Confetti Effect */}
      {showConfetti && (
        <div className='fixed inset-0 z-50'>
          <Confetti
            width={hasWindow() ? window.innerWidth : 0}
            height={hasWindow() ? window.innerHeight : 0}
            numberOfPieces={confettiPieces}
            recycle={false}
            gravity={0.1}
          />
        </div>
      )}

      {/* Game Score Section */}
      <ScoreSection
        players={players}
        scores={scores}
        maxRounds={maxRounds}
        currentRound={currentRound}
        currentPlayer={currentPlayer}
      />

      <div className='border border-gray-200 rounded-md bg-white p-4'>
        <div className='flex flex-col items-center gap-4'>
          <GameStatus
            isGameSeriesOver={isGameSeriesOver}
            winner={winner}
            currentRound={currentRound}
            currentPlayer={currentPlayer}
            getRoundWinnerName={getRoundWinnerName}
          />
          <Game3x3Grid
            board={board as string[]}
            winner={winner}
            isGameSeriesOver={isGameSeriesOver}
            handleCellClick={handleCellClick}
          />

          <GameControlButtons
            isGameSeriesOver={isGameSeriesOver}
            winner={winner}
            currentRound={currentRound}
            maxRounds={maxRounds}
            scores={scores}
            handleNextRound={handleNextRound}
            handleResetGame={handleResetGame}
            handleResetSeries={handleResetSeries}
          />
        </div>
      </div>

      {isGameSeriesOver && (
        <SeriesWinnerModal
          gameSeriesWinner={gameSeriesWinner}
          scores={scores}
          handleNewGameSeries={handleNewGameSeries}
          onClose={handleNewGameSeries}
        />
      )}
    </div>
  );
};

export default GameContainer;
