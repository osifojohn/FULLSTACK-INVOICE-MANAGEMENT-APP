'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { selectAuth, setUser } from '@/redux/features/auth.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { validateUser } from '@/utils/helpers';
import { routes } from '@/constants/links';
import Loader from '@/components/Loader';
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '@/utils/localStorage';

const nonAuthRoutes = [routes.LANDING, routes.AUTH];

const AuthProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  const matchNonAuthRoute = useMemo(
    () => (pathName: string) => {
      const isAuthRoute = nonAuthRoutes.every((item) => {
        if (pathName.includes(item)) return false;
        return true;
      });
      return !isAuthRoute;
    },
    []
  );

  const logout = useCallback(() => {
    removeUserFromLocalStorage();
    router.push(routes.LANDING);
  }, [router]);

  const processAuthValidations = useMemo(
    () => () => {
      const isNonAuthRoute = matchNonAuthRoute(pathname);

      console.log(isNonAuthRoute);

      const user = getUserFromLocalStorage();

      if (!user && !isNonAuthRoute) return logout();

      const isValidUser = validateUser(user);

      if (!isValidUser && !isNonAuthRoute) return logout();
      if (!isValidUser && isNonAuthRoute) return setLoading(false);

      dispatch(setUser(user));

      if (isNonAuthRoute) router.push(`${routes.DASHBOARD}/home`);
    },
    [dispatch, logout, matchNonAuthRoute, pathname, router]
  );

  useEffect(() => {
    if (user) setLoading(false);
  }, [user]);

  useEffect(() => {
    setLoading(true);
    processAuthValidations();
  }, [processAuthValidations, user, children]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader />
      </div>
    );

  return children;
};

export default AuthProvider;
