'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from './components/Loader';

export default function Home() {
  const router = useRouter();

  // Redirect to /experience immediately
  useEffect(() => {
    router.push('/experience');
  }, [router]);

  // Show loader while redirecting
  return <Loader />;
}