'use client';
import Pagination from './pagination';
import InvoiceItemsTable from './InvoiceItemsTable';
import { InvoiceData } from '@/types';

interface InvoiceContentProps {
  invoice: InvoiceData;
  setPage: (val: number) => void;
}

const InvoiceContent = ({ invoice, setPage }: InvoiceContentProps) => {
  return (
    <>
      <div className="bg-white shadow-shadow-1">
        <InvoiceItemsTable data={invoice} />
      </div>
      <div className="flex  justify-between bg-white items-center w-[100%] py-5 pl-10 pr-16 phone:pl-3 phone:pr-5 phone:py-3 border-solid border-t-gray-300 border-t-[1px]">
        <p className="font-bodyFont text-[17px]">{`${invoice?.currentPage} of ${invoice?.totalPages} `}</p>
        <div>
          <Pagination totalPages={invoice?.totalPages} setPage={setPage} />
        </div>
      </div>
    </>
  );
};

export default InvoiceContent;
