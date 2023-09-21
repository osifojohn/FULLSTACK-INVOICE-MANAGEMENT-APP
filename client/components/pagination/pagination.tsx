'use client';
import './pagination.css';
import ReactPaginate from 'react-paginate';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { InvoiceData } from '@/types';

interface PaginationProps {
  setPage: (val: number) => void;
  totalPages: number;
}

const Pagination = ({ setPage, totalPages }: PaginationProps) => {
  return (
    <>
      <ReactPaginate
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        activeClassName={'active'}
        onPageChange={(event) => setPage(event.selected)}
        pageCount={Math.ceil(totalPages)}
        breakLabel="..."
        className="flex  [&>*:first-child]:mr-[1.75rem] [&>*:last-child]:ml-[1.75rem]"
        previousLabel={
          <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
            <AiFillLeftCircle />
          </IconContext.Provider>
        }
        nextLabel={
          <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
            <AiFillRightCircle />
          </IconContext.Provider>
        }
      />
    </>
  );
};

export default Pagination;
