'use client';

import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// use game store
export const useGameStore = () => {
  return useAppSelector((state) => state.ticTacToe);
};

// Custom hooks for Redux
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
