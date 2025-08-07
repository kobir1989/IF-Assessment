import { combineReducers } from '@reduxjs/toolkit';
import productAppReducer from './features/productAppSlice';
import ticTacToeReducer from './features/ticTacToeSlice';
import { apiSlice } from './api/apiSlice';

const rootReducers = combineReducers({
  ticTacToe: ticTacToeReducer,
  productApp: productAppReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducers;
