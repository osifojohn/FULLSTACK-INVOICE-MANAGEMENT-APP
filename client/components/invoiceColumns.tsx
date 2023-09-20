import React, { Dispatch, SetStateAction } from 'react';
import SelectDate from './datePicker';

interface InvoiceColumnsProps {
  startDate?: Date;
  setStartDate: Dispatch<SetStateAction<Date | undefined>>;
}

const InvoiceColumns = ({ startDate, setStartDate }: InvoiceColumnsProps) => {
  return (
    <div className="flex justify-between items-center my-5">
      <h2 className="font-headingFont text-[28px] text-[#313638]">Invoices</h2>
      <div>
        {<SelectDate startDate={startDate} setStartDate={setStartDate} />}
      </div>
    </div>
  );
};

export default InvoiceColumns;
