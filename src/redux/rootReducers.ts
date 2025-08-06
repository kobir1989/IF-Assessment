import { combineReducers } from '@reduxjs/toolkit';
import productAppReducer from './features/productAppSlice';
import ticTacToeReducer from './features/ticTacToeSlice';

const rootReducers = combineReducers({
  ticTacToe: ticTacToeReducer,
  productApp: productAppReducer,
});

export default rootReducers;
