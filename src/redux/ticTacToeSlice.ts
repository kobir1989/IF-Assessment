import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player } from '@/types';
import { PLAYER_X, PLAYER_O, TIE } from '@/constants';

interface PlayerScore {
  roundWins: number;
  totalPoints: number;
  wins: number;
  losses: number;
  ties: number;
}

interface GameState {
  players: Player;
  board: (string | null)[];
  currentPlayer: typeof PLAYER_X | typeof PLAYER_O;
  winner: string | null;
  roundWinner: string | null;
  currentRound: number;
  maxRounds: number;
  gameSeriesWinner: string | null;
  isGameSeriesOver: boolean;
  scores: {
    player1: PlayerScore;
    player2: PlayerScore;
  };
  leaderboard: Array<{
    playerName: string;
    score: number;
    totalPoints: number;
    wins: number;
    losses: number;
    ties: number;
    rank: number;
  }>;
}

const initialPlayerScore: PlayerScore = {
  roundWins: 0,
  totalPoints: 0,
  wins: 0,
  losses: 0,
  ties: 0,
};

const initialState: GameState = {
  players: {
    player1: '',
    player2: '',
  },
  board: Array(9).fill(null),
  currentPlayer: PLAYER_X, // Start with X
  winner: null,
  roundWinner: null,
  currentRound: 1,
  maxRounds: 5,
  gameSeriesWinner: null,
  isGameSeriesOver: false,
  scores: {
    player1: { ...initialPlayerScore },
    player2: { ...initialPlayerScore },
  },
  leaderboard: [],
};

const ticTacToeSlice = createSlice({
  name: 'ticTacToe',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<Player>) => {
      state.players = action.payload;
      // Reset scores when new players are created
      state.scores.player1 = { ...initialPlayerScore };
      state.scores.player2 = { ...initialPlayerScore };
    },
    // update board with each move
    setBoard: (state, action: PayloadAction<(string | null)[]>) => {
      state.board = action.payload;
    },
    // update current player (X OR O)
    setCurrentPlayer: (state, action: PayloadAction<typeof PLAYER_X | typeof PLAYER_O>) => {
      state.currentPlayer = action.payload;
    },
    // update winner (X OR O OR TIE)
    setWinner: (state, action: PayloadAction<string | null>) => {
      state.winner = action.payload;
    },
    // update scores based on round result
    completeRound: (state, action: PayloadAction<{ winner: string | null }>) => {
      const { winner } = action.payload;
      state.roundWinner = winner;

      // Update scores based on round result
      if (winner === PLAYER_X) {
        // Player 1 wins round
        state.scores.player1.roundWins += 1;
        state.scores.player1.wins += 1;
        state.scores.player1.totalPoints += 2; // Win = 2 points
        state.scores.player2.losses += 1;
        state.scores.player2.totalPoints += 1; // Loss = 1 point
      } else if (winner === PLAYER_O) {
        // Player 2 wins round
        state.scores.player2.roundWins += 1;
        state.scores.player2.wins += 1;
        state.scores.player2.totalPoints += 2; // Win = 2 points
        state.scores.player1.losses += 1;
        state.scores.player1.totalPoints += 1; // Loss = 1 point
      } else if (winner === TIE) {
        // Tie - 0 points for both
        state.scores.player1.ties += 1;
        state.scores.player2.ties += 1;
      }

      // Check if game series is over (first to 3 round wins or max rounds done)
      const player1RoundWins = state.scores.player1.roundWins;
      const player2RoundWins = state.scores.player2.roundWins;

      if (player1RoundWins >= 3) {
        state.gameSeriesWinner = state.players.player1;
        state.isGameSeriesOver = true;
      } else if (player2RoundWins >= 3) {
        state.gameSeriesWinner = state.players.player2;
        state.isGameSeriesOver = true;
      } else if (state.currentRound >= state.maxRounds) {
        // check winner by round wins, then by total points
        if (player1RoundWins > player2RoundWins) {
          state.gameSeriesWinner = state.players.player1;
        } else if (player2RoundWins > player1RoundWins) {
          state.gameSeriesWinner = state.players.player2;
        } else {
          // Tie in round wins, check by total points
          if (state.scores.player1.totalPoints > state.scores.player2.totalPoints) {
            state.gameSeriesWinner = state.players.player1;
          } else if (state.scores.player2.totalPoints > state.scores.player1.totalPoints) {
            state.gameSeriesWinner = state.players.player2;
          } else {
            state.gameSeriesWinner = TIE;
          }
        }
        state.isGameSeriesOver = true;
      }

      // Add to leaderboard if game series is done
      if (state.isGameSeriesOver) {
        // Update leaderboard for both players
        const updatePlayerInLeaderboard = (playerName: string, playerStats: PlayerScore) => {
          const existingPlayerIndex = state.leaderboard.findIndex(
            (entry) => entry.playerName === playerName
          );

          if (existingPlayerIndex !== -1) {
            // Update existing player
            const existingPlayer = state.leaderboard[existingPlayerIndex];
            existingPlayer.totalPoints += playerStats.totalPoints;
            existingPlayer.wins += playerStats.wins;
            existingPlayer.losses += playerStats.losses;
            existingPlayer.ties += playerStats.ties;
            existingPlayer.score = existingPlayer.totalPoints;
          } else {
            // Add new player
            const newPlayer = {
              playerName,
              score: playerStats.totalPoints,
              totalPoints: playerStats.totalPoints,
              wins: playerStats.wins,
              losses: playerStats.losses,
              ties: playerStats.ties,
              rank: 0,
            };
            state.leaderboard.push(newPlayer);
          }
        };

        // Update both players in leadeboard
        updatePlayerInLeaderboard(state.players.player1, state.scores.player1);
        updatePlayerInLeaderboard(state.players.player2, state.scores.player2);

        // Sort leaderboard by total points (dsc) and update ranks
        state.leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
        state.leaderboard.forEach((entry, index) => {
          entry.rank = index + 1;
        });
      }
    },
    // start next round
    startNextRound: (state) => {
      if (!state.isGameSeriesOver && state.currentRound < state.maxRounds) {
        state.currentRound += 1;
        state.board = Array(9).fill(null);
        state.currentPlayer = PLAYER_X;
        state.winner = null;
        state.roundWinner = null;
      }
    },
    // reset game to start a new round
    resetGame: (state) => {
      state.board = Array(9).fill(null);
      state.currentPlayer = PLAYER_X;
      state.winner = null;
      state.roundWinner = null;
    },
    // reset game series to start a new game series
    resetGameSeries: (state) => {
      state.board = Array(9).fill(null);
      state.currentPlayer = PLAYER_X;
      state.winner = null;
      state.roundWinner = null;
      state.currentRound = 1;
      state.gameSeriesWinner = null;
      state.isGameSeriesOver = false;
      state.scores.player1 = { ...initialPlayerScore };
      state.scores.player2 = { ...initialPlayerScore };
    },
    resetLeaderboard: (state) => {
      state.leaderboard = [];
    },
  },
});

export const {
  setPlayers,
  setBoard,
  setCurrentPlayer,
  setWinner,
  completeRound,
  startNextRound,
  resetGame,
  resetGameSeries,
  resetLeaderboard,
} = ticTacToeSlice.actions;

export default ticTacToeSlice.reducer;
