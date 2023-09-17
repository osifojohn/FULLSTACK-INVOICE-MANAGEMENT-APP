import React from 'react';
import InvoiceItems from './invoiceItems';

const InvoiceContent = () => {
  return (
    <div className="bg-white shadow-shadow-1">
      {/* <div className="invoiceColumnBtn ">
        <h5>Invoice number</h5>
        <h5>Date</h5>
        <h5>Customer</h5>
        <h5>Amount</h5>
        <h5>Paid</h5>
        <h5>Status</h5>
        <h5>Action</h5>
      </div> */}
      {InvoiceItems()}
    </div>
  );
};

export default InvoiceContent;
