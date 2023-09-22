'use client';
import Skeleton from 'react-loading-skeleton';
import InvoiceItemsSkeleton from './invoiceItemsSkeleton';
import '../pagination/pagination.css';

const InvoiceContentSkeleton = () => {
  return (
    <>
      <div className="bg-white shadow-shadow-1">
        <InvoiceItemsSkeleton />
      </div>
      <div className="flex  justify-between bg-white items-center w-[100%] py-5 pl-10 pr-16 border-solid border-t-gray-300 border-t-[1px]">
        <p className="font-bodyFont text-[17px]">
          <Skeleton />
        </p>
        <div>{<Skeleton />}</div>
      </div>
    </>
  );
};

export default InvoiceContentSkeleton;
