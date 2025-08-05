'use client';

import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  setBoard,
  setCurrentPlayer,
  setWinner,
  completeRound,
  startNextRound,
  resetGame,
  resetGameSeries,
} from '@/redux/ticTacToeSlice';
import ScoreSection from '@/components/tic-tac-toe/ScoreSection';
import GameControlButtons from '@/components/tic-tac-toe/GameControlButtons';
import SeriesWinnerModal from '@/components/tic-tac-toe/SeriesWinnerModal';
import GameStatus from '@/components/tic-tac-toe/GameStatus';
import Game3x3Grid from '@/components/tic-tac-toe/Game3x3Grid';
import { PLAYER_X, PLAYER_O, WINNING_LINES, TIE } from '@/constants';

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
  } = useAppSelector((state) => state.ticTacToe);
  const dispatch = useAppDispatch();

  // Check each winning line after each move
  const checkWinner = (board: (string | null)[]): string | null => {
    console.log('board', board);

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
  };

  const handleNewGameSeries = () => {
    dispatch(resetGameSeries());
  };

  const getRoundWinnerName = () => {
    if (roundWinner === PLAYER_X) return players.player1;
    if (roundWinner === PLAYER_O) return players.player2;
    if (roundWinner === TIE) return 'Tie';
    return null;
  };

  return (
    <div className='w-full'>
      {/* Game Score Section */}
      <ScoreSection
        players={players}
        scores={scores}
        maxRounds={maxRounds}
        currentRound={currentRound}
      />

      <div className='border border-gray-200 rounded-md bg-white p-4'>
        <div className='flex flex-col items-center gap-4'>
          <GameStatus
            isGameSeriesOver={isGameSeriesOver}
            winner={winner}
            currentRound={currentRound}
            currentPlayer={currentPlayer}
            players={players}
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
          />
        </div>
      </div>

      {isGameSeriesOver && (
        <SeriesWinnerModal
          gameSeriesWinner={gameSeriesWinner}
          scores={scores}
          handleNewGameSeries={handleNewGameSeries}
          onClose={() => {}}
        />
      )}
    </div>
  );
};

export default GameContainer;
