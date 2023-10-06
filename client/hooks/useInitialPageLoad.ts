import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/constants/links';
import { getUserFromLocalStorage } from '@/utils/localStorage';
import { validateUser } from '@/utils/helpers';

export const useInitialPageLoad = () => {
  const router = useRouter();
  const userInitialPageLoad = getUserFromLocalStorage();

  return userInitialPageLoad;
};
