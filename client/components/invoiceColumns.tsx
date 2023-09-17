import React, { useState, useEffect } from 'react';
import SelectDate from './datePicker';
import { format } from 'date-fns';

const InvoiceColumns = () => {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const formattedDate = format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  }, [startDate]);

  return (
    <>
      <div className="flex justify-between my-7 ">
        <h2 className="font-headingFont text-[28px] text-[#313638]">
          Invoices
        </h2>
        <div>
          <SelectDate startDate={startDate} setStartDate={setStartDate} />
        </div>
      </div>
      <div className=" shadow-shadow-1  invoiceColumnBtn border-solid border-b-[#939393] border-b-[1px]">
        <button>All</button>
        <button>Paid</button>
        <button>Partially Paid</button>
        <button>Pending </button>
        <button>Draft</button>
        <button>Overdue</button>
      </div>
    </>
  );
};

export default InvoiceColumns;
