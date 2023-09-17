import React from 'react';

const invoiceColumns = () => {
  return (
    <>
      <div className="flex justify-between my-7 ">
        <h2 className="font-headingFont text-[28px] text-[#313638]">
          Invoices
        </h2>
        <button>Last 30 days</button>
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

export default invoiceColumns;
