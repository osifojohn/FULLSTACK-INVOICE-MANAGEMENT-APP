import useInvoiceChartData from '@/hooks/useInvoiceChartData';
import InvoiceChart from '@/components/charts/chart';
import SelectDate from '@/components/datePicker';
import { useInvoiceChartDateContext } from '@/context/dateContext';
import { InvoiceChartProps } from '@/types';

const options = {
  title: 'Invoice status',
  is3D: true,
};

const InvoiceStatus = ({
  invoices,
  chartDataIsLoading,
  chartDataIsFetching,
  chartError,
  chartLoading,
}: InvoiceChartProps) => {
  const data = useInvoiceChartData({
    invoices,
    row: 'Status',
    col: 'Count',
    isPieChart: true,
  });

  const { invoiceStartChartDate, setInvoiceStartChartDate } =
    useInvoiceChartDateContext();

  if (chartDataIsLoading || chartDataIsFetching) {
    return chartLoading();
  }

  if (
    !chartDataIsFetching &&
    !chartDataIsLoading &&
    invoices &&
    invoices.length === 0
  ) {
    return chartError();
  }

  return (
    <div className="flex flex-col">
      <div className="ml-auto">
        <SelectDate
          startDate={invoiceStartChartDate}
          setStartDate={setInvoiceStartChartDate}
        />
      </div>

      <div>
        <InvoiceChart
          data={data}
          options={options}
          chartType={'PieChart'}
          width={'100%'}
          height={'400px'}
        />
      </div>
    </div>
  );
};

export default InvoiceStatus;
