'use client';
import { useCallback } from 'react';
import { INVOICESTATUS, InvoiceData } from '@/types';

interface InvoiceFilterProps {
  data: InvoiceData;
  setData: (val: InvoiceData) => void;
  filterInput: string;
  setFilterInput: (val: string) => void;
}

const InvoiceFilter = ({
  setData,
  data,
  setFilterInput,
  filterInput,
}: InvoiceFilterProps) => {
  const handleClick = useCallback(
    (val: string) => {
      const newInvoice = data.invoices.filter((obj) => obj.status === val);
      newInvoice ? setData({ ...data, invoices: newInvoice }) : setData(data);
      setFilterInput(val);
    },
    [data, setData, setFilterInput]
  );

  return (
    <div className=" shadow-shadow-1  invoiceColumnBtn border-solid border-t-gray-300 border-b-[1px]">
      <button
        onClick={() => handleClick('all')}
        className={`${filterInput === 'all' ? 'activeBtn' : ''}`}
      >
        All
      </button>
      <button
        onClick={() => handleClick(INVOICESTATUS.PAID)}
        className={`${filterInput === INVOICESTATUS.PAID ? 'activeBtn' : ''}`}
      >
        Paid
      </button>
      <button
        onClick={() => handleClick(INVOICESTATUS.PARTIALLY_PAID)}
        className={`${
          filterInput === INVOICESTATUS.PARTIALLY_PAID ? 'activeBtn' : ''
        }`}
      >
        Partially Paid
      </button>
      <button
        onClick={() => handleClick(INVOICESTATUS.PENDING)}
        className={`${
          filterInput === INVOICESTATUS.PENDING ? 'activeBtn' : ''
        }`}
      >
        Pending
      </button>
      <button
        onClick={() => handleClick(INVOICESTATUS.DRAFT)}
        className={`${filterInput === INVOICESTATUS.DRAFT ? 'activeBtn' : ''}`}
      >
        Draft
      </button>
      <button
        onClick={() => handleClick(INVOICESTATUS.OVERDUE)}
        className={`${
          filterInput === INVOICESTATUS.OVERDUE ? 'activeBtn' : ''
        }`}
      >
        Overdue
      </button>
    </div>
  );
};

export default InvoiceFilter;
