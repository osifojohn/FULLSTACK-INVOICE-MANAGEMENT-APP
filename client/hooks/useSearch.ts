interface useSearchProps {
  useGetSearch: any;
  keyword: string | undefined;
  searchPage: number;
}

const useSearch = ({ useGetSearch, keyword, searchPage }: useSearchProps) => {
  const { data: seachResult, isLoading: searchIsLoading } = useGetSearch({
    keyword: keyword ? keyword : undefined,
    page: searchPage + 1,
  });

  return {
    seachResult,
    searchIsLoading,
  };
};

export default useSearch;
