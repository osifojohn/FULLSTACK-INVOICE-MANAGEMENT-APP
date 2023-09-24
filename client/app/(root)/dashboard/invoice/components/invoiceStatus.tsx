import useInvoiceChartData from '@/hooks/useInvoiceChartData';
import ChartComponent from '@/components/charts/chart';
import { Invoice } from '@/types';

export const options = {
  title: 'Invoice status',
  is3D: true,
};

const InvoiceStatus = ({ invoices }: { invoices: Invoice[] }) => {
  const data = useInvoiceChartData({
    invoices,
    row: 'Status',
    col: 'Count',
    isPieChart: true,
  });

  return (
    <div>
      <ChartComponent
        data={data}
        options={options}
        chartType={'PieChart'}
        width={'100%'}
        height={'400px'}
      />
    </div>
  );
};

export default InvoiceStatus;
