'use client';
import { BsSearch } from 'react-icons/bs';

import { useSearchKeywordContext } from '@/context/searchKeywordContext';
import { selectInvoicePdf } from '@/redux/features/invoice.slice';
import { useAppSelector } from '@/redux/hooks';

const SearchBar = () => {
  const { keyword, setKeyword } = useSearchKeywordContext();
  const { showPdf } = useAppSelector(selectInvoicePdf);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setKeyword(value);
  };

  return (
    <div className="relative flex items-center   mr-10 tabPort2:mr-8  phone:max-w-[240px] phone:w-[100%]  phone:mr-0">
      <div className="absolute left-2 top-5 tabPort2:top-4 ">
        <BsSearch className="h-3 w-8 " />
      </div>
      <input
        placeholder="Client name..."
        className="searchInput"
        value={keyword}
        onChange={handleChange}
        disabled={showPdf}
      />
    </div>
  );
};

export default SearchBar;
