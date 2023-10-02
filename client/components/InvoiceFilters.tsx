'use client';
import { useCallback } from 'react';
import { INVOICESTATUS, InvoiceData } from '@/types';

interface InvoiceFilterProps {
  data: InvoiceData | undefined;
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
  const isInvoiceNotEmpty = data && data.invoices.length !== 0;

  const handleClick = useCallback(
    (val: string) => {
      const newInvoice =
        data && data?.invoices.filter((obj) => obj.status === val);
      newInvoice
        ? setData({ ...data, invoices: newInvoice })
        : setData(data as InvoiceData);
      setFilterInput(val);
    },
    [data, setData, setFilterInput]
  );

  return (
    <div className=" shadow-shadow-1  invoiceColumnBtn border-solid border-t-gray-300 border-b-[1px]">
      <button
        onClick={() => handleClick('all')}
        className={`${
          filterInput === 'all' && isInvoiceNotEmpty ? 'activeBtn' : ''
        }`}
        disabled={!isInvoiceNotEmpty}
      >
        All
      </button>
      <button
        onClick={() => handleClick(INVOICESTATUS.PAID)}
        className={`${
          filterInput === INVOICESTATUS.PAID && isInvoiceNotEmpty
            ? 'activeBtn'
            : ''
        }`}
        disabled={!isInvoiceNotEmpty}
      >
        Paid
      </button>
      <button
        onClick={() => handleClick(INVOICESTATUS.PARTIALLY_PAID)}
        className={`${
          filterInput === INVOICESTATUS.PARTIALLY_PAID && isInvoiceNotEmpty
            ? 'activeBtn'
            : ''
        }`}
        disabled={!isInvoiceNotEmpty}
      >
        Partially-paid
      </button>
      <button
        onClick={() => handleClick(INVOICESTATUS.PENDING)}
        className={`${
          filterInput === INVOICESTATUS.PENDING && isInvoiceNotEmpty
            ? 'activeBtn'
            : ''
        }`}
        disabled={!isInvoiceNotEmpty}
      >
        Pending
      </button>
      <button
        onClick={() => handleClick(INVOICESTATUS.DRAFT)}
        className={`${
          filterInput === INVOICESTATUS.DRAFT && isInvoiceNotEmpty
            ? 'activeBtn'
            : ''
        }`}
        disabled={!isInvoiceNotEmpty}
      >
        Draft
      </button>
      <button
        onClick={() => handleClick(INVOICESTATUS.OVERDUE)}
        className={`${
          filterInput === INVOICESTATUS.OVERDUE && isInvoiceNotEmpty
            ? 'activeBtn'
            : ''
        }`}
        disabled={!isInvoiceNotEmpty}
      >
        Overdue
      </button>
    </div>
  );
};

export default InvoiceFilter;
