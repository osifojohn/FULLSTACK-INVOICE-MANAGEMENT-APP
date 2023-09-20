'use client';
import { InvoiceData } from '@/types';

interface InvoiceItemsProps {
  data: InvoiceData;
}

const InvoiceItems = ({ data }: InvoiceItemsProps) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Paid</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.invoices.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.invoiceNumber}</td>
                <td>{item?.createdAt.substring(0, 10)}</td>
                <td>{item?.clientName}</td>
                <td>${item.paidToDate}</td>
                <td>{item.status}</td>
                <td>{showInvoice()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

function showInvoice() {
  return <button>View</button>;
}

export default InvoiceItems;
