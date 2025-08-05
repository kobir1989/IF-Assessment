'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { makeStore, AppStore } from './store';
import { Persistor } from 'redux-persist';
import Loader from '@/components/ui/Loader';

interface StoreInstance {
  store: AppStore;
  persistor: Persistor;
}

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  // Create the store and persistor instances only once
  const storeRef = useRef<StoreInstance | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current.store}>
      <PersistGate loading={<Loader />} persistor={storeRef.current.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
