import { createContext, useContext } from 'react';

export const NotificationSkipContext = createContext({
  notificationSkip: true,
  setNotificationSkip: (val: boolean) => {},
});

export function useNotificationSkipContext() {
  const value = useContext(NotificationSkipContext);
  return value;
}
