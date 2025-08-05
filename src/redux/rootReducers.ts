import { combineReducers } from '@reduxjs/toolkit';
import ticTacToeReducer from './ticTacToeSlice';

const rootReducers = combineReducers({
  ticTacToe: ticTacToeReducer,
});

export default rootReducers;
