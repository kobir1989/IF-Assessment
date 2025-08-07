'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/assignment-1');
  }, [router]);

  return <Loader />;
}
