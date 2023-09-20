'use client';

const InvoiceFilter = () => {
  return (
    <div className=" shadow-shadow-1  invoiceColumnBtn border-solid border-b-[#939393] border-b-[1px]">
      <button>All</button>
      <button>Paid</button>
      <button>Partially Paid</button>
      <button>Pending </button>
      <button>Draft</button>
      <button>Overdue</button>
    </div>
  );
};

export default InvoiceFilter;
