'use client';
import { useInvoiceChartDateContext } from '@/context/dateContext';
import useInvoiceChartData from '@/hooks/useInvoiceChartData';
import InvoiceChart from '@/components/charts/chart';
import SelectDate from '@/components/datePicker';
import { InvoiceChartProps } from '@/types';

const options = {
  title: 'Payments',
  is3D: true,
  curveType: 'function',
};

const Payment = ({
  invoices,
  chartDataIsLoading,
  chartDataIsFetching,
  chartError,
  chartLoading,
}: InvoiceChartProps) => {
  const data = useInvoiceChartData({
    invoices,
    row: 'Client Name',
    col: 'Paid to date',
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
          chartType={'LineChart'}
          width={'100%'}
          height={'400px'}
        />
      </div>
    </div>
  );
};

export default Payment;
