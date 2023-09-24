import { createContext, useContext } from 'react';

export const DateContext = createContext({
  startDate: undefined,
  setStartDate: (val: any) => {},
});

export function useDateContext() {
  const value = useContext(DateContext);
  return value;
}
