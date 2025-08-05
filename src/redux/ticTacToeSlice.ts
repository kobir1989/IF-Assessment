import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Player {
  player1: string;
  player2: string;
}

interface GameState {
  players: Player;
  board: (string | null)[];
  currentPlayer: 'X' | 'O';
  winner: string | null;
  leaderboard: string[];
}

const initialState: GameState = {
  players: {
    player1: '',
    player2: '',
  },
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  leaderboard: [],
};

const ticTacToeSlice = createSlice({
  name: 'ticTacToe',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<Player>) => {
      state.players = action.payload;
    },
    setBoard: (state, action: PayloadAction<(string | null)[]>) => {
      state.board = action.payload;
    },
    setCurrentPlayer: (state, action: PayloadAction<'X' | 'O'>) => {
      state.currentPlayer = action.payload;
    },
    setWinner: (state, action: PayloadAction<string | null>) => {
      state.winner = action.payload;
    },
    updateLeaderboard: (state, action: PayloadAction<string>) => {
      state.leaderboard.push(action.payload);
    },
    resetGame: (state) => {
      state.board = Array(9).fill(null);
      state.currentPlayer = 'X';
      state.winner = null;
    },
  },
});

export const { setPlayers, setBoard, setCurrentPlayer, setWinner, updateLeaderboard, resetGame } =
  ticTacToeSlice.actions;

export default ticTacToeSlice.reducer;
