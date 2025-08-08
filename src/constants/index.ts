export const ROUTES = {
  assignment_1: {
    root: '/assignment-1',
    game: {
      playerSetup: '/assignment-1',
      game: '/assignment-1/game',
      leaderBoard: '/assignment-1/leaderboard',
    },
  },
  assignment_2: {
    root: '/assignment-2',
    productApp: {
      productList: '/assignment-2',
      manageProduct: '/assignment-2/manage-product',
      productDetails: '/assignment-2/product-details/',
    },
  },
};

export const NAV_LINKS = [
  {
    label: 'Assignment 1',
    href: ROUTES.assignment_1.root,
  },
  {
    label: 'Assignment 2',
    href: ROUTES.assignment_2.root,
  },
];

export const GAME_NAV_LINKS = [
  {
    label: 'Player Setup',
    href: ROUTES.assignment_1.game.playerSetup,
  },
  {
    label: 'Game',
    href: ROUTES.assignment_1.game.game,
  },
  {
    label: 'Leaderboard',
    href: ROUTES.assignment_1.game.leaderBoard,
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

export const ITEMS_PER_PAGE = 5;
