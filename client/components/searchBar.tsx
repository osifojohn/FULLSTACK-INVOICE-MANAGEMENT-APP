'use client';
import { BsSearch } from 'react-icons/bs';
import { useSearchKeywordContext } from '@/context/searchKeywordContext';
import { useAppSelector } from '@/redux/hooks';
import { selectInvoicePdf } from '@/redux/features/invoice.slice';

const SearchBar = () => {
  const { keyword, setKeyword } = useSearchKeywordContext();
  const { showPdf } = useAppSelector(selectInvoicePdf);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setKeyword(value);
  };

  return (
    <div className="relative flex items-center  mr-10">
      <div className="absolute left-2 top-5 ">
        <BsSearch className="h-3 w-8 " />
      </div>
      <input
        placeholder="Search..."
        className="w-96 h-14 text-lg font-normal leading-10 pl-[40px] pr-14 pt-3.5 pb-4 rounded-lg border border-zinc-400 hover:border-zinc-400  focus:border-none"
        value={keyword}
        onChange={handleChange}
        disabled={showPdf}
      />
    </div>
  );
};

export default SearchBar;
