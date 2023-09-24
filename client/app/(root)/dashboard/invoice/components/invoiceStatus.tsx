import useInvoiceChartData from '@/hooks/useInvoiceChartData';
import InvoiceChart from '@/components/charts/chart';
import { Invoice } from '@/types';

const options = {
  title: 'Invoice status',
  is3D: true,
};

const InvoiceStatus = ({
  invoices,
}: {
  invoices: Invoice[];
  setStartChartDate: (val: Date | undefined) => void;
}) => {
  const data = useInvoiceChartData({
    invoices,
    row: 'Status',
    col: 'Count',
    isPieChart: true,
  });

  return (
    <div>
      <InvoiceChart
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
