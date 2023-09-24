'use client';
import useInvoiceChartData from '@/hooks/useInvoiceChartData';
import InvoiceChart from '@/components/charts/chart';
import { Invoice } from '@/types';

const options = {
  title: 'Payments',
  is3D: true,
  curveType: 'function',
};

const Payment = ({ invoices }: { invoices: Invoice[] }) => {
  const data = useInvoiceChartData({
    invoices,
    row: 'Client Name',
    col: 'Paid to date',
  });

  return (
    <div>
      <InvoiceChart
        data={data}
        options={options}
        chartType={'LineChart'}
        width={'100%'}
        height={'400px'}
      />
    </div>
  );
};

export default Payment;
