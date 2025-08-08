'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './store';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef(makeStore()); // { store, persistor }
  return <Provider store={storeRef.current.store}>{children}</Provider>;
}
