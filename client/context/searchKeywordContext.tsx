import { createContext, useContext } from 'react';

export const SearchKeywordContext = createContext({
  keyword: '',
  setKeyword: (val: string) => {},
});

export function useSearchKeywordContext() {
  const value = useContext(SearchKeywordContext);
  return value;
}
