'use client';
import { routes } from '@/constants/links';
import { selectAuth } from '@/redux/features/auth.slice';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(routes.LANDING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <BeatLoader color="#36d7b7" loading speedMultiplier={2} />
    </div>
  );
};

export default Home;
