'use client';

import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// use game store
export const useGameStore = () => {
  return useAppSelector((state) => state.ticTacToe);
};
// use product app
export const useProductAppStore = () => {
  return useAppSelector((state) => state.productApp);
};

// Custom hooks for Redux
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
