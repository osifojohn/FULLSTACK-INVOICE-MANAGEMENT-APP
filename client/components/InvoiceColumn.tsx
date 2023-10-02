import React, { Dispatch, SetStateAction } from 'react';
import SelectDate from './DatePickers';
import { InvoiceData } from '@/types';

interface InvoiceColumnsProps {
  startDate?: Date;
  setStartDate: Dispatch<SetStateAction<Date | undefined>>;
  searchInvoiceKeyword: string;
  data: InvoiceData | undefined;
}

const InvoiceColumns = ({
  startDate,
  setStartDate,
  searchInvoiceKeyword,
  data,
}: InvoiceColumnsProps) => {
  if (!data) {
    return;
  }
  return (
    <div className="flex justify-between items-center my-5">
      <h2 className="font-headingFont  text-[#313638] ">Invoices</h2>
      <div>
        {!searchInvoiceKeyword && (
          <SelectDate startDate={startDate} setStartDate={setStartDate} />
        )}
      </div>
    </div>
  );
};

export default InvoiceColumns;
