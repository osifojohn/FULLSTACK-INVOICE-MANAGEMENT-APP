'use client';
import SelectDate from '@/components/datePicker';

export const options = {
  title: 'Clients Contributions',
  // width: 900,
  // legend: { position: 'none' },
  chart: { title: 'Chess opening moves', subtitle: 'popularity by percentage' },
  bars: 'horizontal', // Required for Material Bar Charts.
  axes: {
    x: {
      0: { side: 'top', label: 'Percentage' }, // Top x-axis.
    },
  },
  bar: { groupWidth: '90%' },
};
import { useInvoiceChartDateContext } from '@/context/dateContext';
import useInvoiceChartData from '@/hooks/useInvoiceChartData';
import InvoiceChart from '@/components/charts/chart';
import { Invoice, InvoiceChartProps } from '@/types';

const ClientRevenue = ({
  invoices,
  chartDataIsLoading,
  chartDataIsFetching,
  chartError,
  chartLoading,
}: InvoiceChartProps) => {
  const { invoiceStartChartDate, setInvoiceStartChartDate } =
    useInvoiceChartDateContext();

  const data = useInvoiceChartData({
    invoices,
    row: 'Paid to date',
    col: 'Client Name',
  });

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
      <div className="">
        <InvoiceChart
          data={data}
          options={options}
          chartType={'BarChart'}
          width={'100%'}
          height={'400px'}
        />
      </div>
    </div>
  );
};

export default ClientRevenue;
