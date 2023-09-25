'use client';
import { InvoiceData } from '@/types';
import { useAppDispatch } from '@/redux/hooks';
import { toggleInvoice, updatePdfUrl } from '@/redux/features/invoice.slice';
interface InvoiceItemsProps {
  data: InvoiceData;
}

const InvoiceItems = ({ data }: InvoiceItemsProps) => {
  const dispatch = useAppDispatch();

  const handleClick = (url: string) => {
    dispatch(updatePdfUrl(url));
    dispatch(toggleInvoice());
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Number </th>
            <th>Date </th>
            <th>Customer</th>
            <th>Paid-to-date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.invoices.map((item) => {
            return (
              <tr key={item?._id}>
                <td>{item?.invoiceNumber}</td>
                <td>{item?.createdAt.substring(0, 10)}</td>
                <td>{item?.clientName}</td>
                <td>${item?.paidToDate}</td>
                <td>{item?.status}</td>
                <td
                  onClick={() => handleClick(item.invoicePdf.url)}
                  className="cursor-pointer"
                >
                  View
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default InvoiceItems;
