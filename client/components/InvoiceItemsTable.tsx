'use client';
import { toggleInvoice, updatePdfUrl } from '@/redux/features/invoice.slice';
import { INVOICESTATUS, InvoiceData } from '@/types';
import { useAppDispatch } from '@/redux/hooks';

import '../components/styles/tableStyles.css';

interface InvoiceItemsProps {
  data: InvoiceData;
}

const InvoiceItemsTable = ({ data }: InvoiceItemsProps) => {
  const dispatch = useAppDispatch();

  const handleClick = (url: string) => {
    dispatch(updatePdfUrl(url));
    dispatch(toggleInvoice());
  };

  return (
    <>
      <table>
        <thead>
          <tr className=" [&>*]:font-bodyFont [&>*]:text-[#939393]">
            <th>Number </th>
            <th>Date </th>
            <th>Customer</th>
            <th>$Paid</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.invoices.map(
            ({
              _id,
              invoiceNumber,
              createdAt,
              clientName,
              paidToDate,
              status,
              invoicePdf,
            }) => {
              return (
                <tr key={_id} className=" [&>*]:font-bodyFont tableRowBody">
                  <td className="text-[#313638] leading-4">{invoiceNumber}</td>
                  <td className="text-[#313638]">
                    {createdAt.substring(0, 10)}
                  </td>
                  <td className="text-[#939393]">{clientName}</td>
                  <td className="text-[#939393]">{paidToDate}</td>
                  <td
                    className={`${
                      status === INVOICESTATUS.PAID && 'text-[#53A178]'
                    } ${status === INVOICESTATUS.OVERDUE && 'text-[#E44339]'} ${
                      status === INVOICESTATUS.DRAFT && 'text-[#313638]'
                    } ${
                      status === INVOICESTATUS.PARTIALLY_PAID &&
                      'text-[#E6A960]'
                    }`}
                  >
                    {status}
                  </td>
                  <td
                    onClick={() => handleClick(invoicePdf.url)}
                    className="cursor-pointer text-[#313638]"
                  >
                    View
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </>
  );
};

export default InvoiceItemsTable;
