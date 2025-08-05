export const NAV_LINKS = [
  {
    label: 'Assignment 1',
    href: '/assignment-1',
  },
  {
    label: 'Assignment 2',
    href: '/assignment-2',
  },
];

export const GAME_NAV_LINKS = [
  {
    label: 'Player Setup',
    href: '/assignment-1',
  },
  {
    label: 'Game',
    href: '/assignment-1/game',
  },
  {
    label: 'Leaderboard',
    href: '/assignment-1/leaderboard',
  },
];

export const WINNING_LINES = [
  [0, 1, 2], // vertical match (---) (0 1 2)
  [3, 4, 5], // vertical match (---) (3 4 5)
  [6, 7, 8], // vertical match (---) (6 7 8)
  [0, 3, 6], // horizontal match (left) (0 3 6)
  [1, 4, 7], // horizontal match (middle) (1 4 7)
  [2, 5, 8], // horizontal match (right) (2 5 8)
  [0, 4, 8], // top left to bottom right match (0 4 8)
  [2, 4, 6], // top right to bottom left match (2 4 6)
];

export const PLAYER_X = 'X';
export const PLAYER_O = 'O';
export const TIE = 'tie';
