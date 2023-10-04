'use client';
import './styles/pagination.css';
import ReactPaginate from 'react-paginate';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { useState } from 'react';

interface PaginationProps {
  setPage: (val: number) => void;
  totalPages: number;
  isLoading: boolean;
  isFetching: boolean;
}

const Pagination = ({
  setPage,
  totalPages,
  isLoading,
  isFetching,
}: PaginationProps) => {
  const disabledIconStyle = {
    color: '#B8C1CC',
    size: '36px',
    opacity: 0.5,
    pointerEvents: 'none',
  };

  return (
    <>
      <ReactPaginate
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        activeClassName={'active'}
        onPageChange={(event) => setPage(event.selected)}
        pageCount={Math.ceil(totalPages)}
        breakLabel="..."
        className="flex  [&>*:first-child]:mr-[1.75rem] [&>*:last-child]:ml-[1.75rem] phone:[&>*:first-child]:mr-[1rem] phone:[&>*:last-child]:ml-[1rem]"
        previousLabel={
          <IconContext.Provider
            value={
              isLoading || isFetching
                ? disabledIconStyle
                : { color: '#B8C1CC', size: '36px' }
            }
          >
            <AiFillLeftCircle />
          </IconContext.Provider>
        }
        nextLabel={
          <IconContext.Provider
            value={
              isLoading || isFetching
                ? disabledIconStyle
                : { color: '#B8C1CC', size: '36px' }
            }
          >
            <AiFillRightCircle />
          </IconContext.Provider>
        }
      />
    </>
  );
};

export default Pagination;
