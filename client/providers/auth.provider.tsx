import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { BeatLoader } from 'react-spinners';

import { selectAuth, setUser } from '@/redux/features/auth.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { validateUser } from '@/utils/helpers';
import { routes } from '@/constants/links';
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

  useEffect(() => {
    const processAuthValidations = () => {
      const isNonAuthRoute = matchNonAuthRoute(pathname);

      const user = getUserFromLocalStorage();

      if (!user && !isNonAuthRoute) return logout();

      const isValidUser = validateUser(user);

      if (!isValidUser && !isNonAuthRoute) return logout();
      if (!isValidUser && isNonAuthRoute) return setLoading(false);

      dispatch(setUser(user));
    };

    if (user) {
      setLoading(false);
    } else {
      setLoading(true);
      processAuthValidations();
    }
  }, [dispatch, logout, matchNonAuthRoute, pathname, router, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <BeatLoader color="#36d7b7" loading speedMultiplier={2} />
      </div>
    );
  }

  return children;
};

export default AuthProvider;
