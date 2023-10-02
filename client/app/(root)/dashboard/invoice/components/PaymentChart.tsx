'use client';
import { selectDashboardToggle } from '@/redux/features/dashboardToggle.slice';
import { useInvoiceChartDateContext } from '@/context/dateContext';
import useInvoiceChartData from '@/hooks/useInvoiceChartData';
import InvoiceChart from '@/components/charts/InvoiceChart';
import SelectDate from '@/components/DatePickers';
import { useAppSelector } from '@/redux/hooks';
import { InvoiceChartProps } from '@/types';

const PaymentChart = ({
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
  const { notification, leftSidebar } = useAppSelector(selectDashboardToggle);

  const { invoiceStartChartDate, setInvoiceStartChartDate } =
    useInvoiceChartDateContext();

  if (chartDataIsLoading || chartDataIsFetching) {
    return chartLoading();
  }

  const options = {
    title: 'Payments',
    is3D: true,
    curveType: 'function',
    height: notification && leftSidebar ? 370 : 400,
    hAxis: {
      // title: 'Clients',
      titleTextStyle: {
        fontSize: 13,
      },
      textStyle: {
        fontSize: 11,
        fontName: 'Sans-Serif',
        color: '#313638',
      },
    },
    vAxis: {
      // title: 'Amount',
      titleTextStyle: {
        fontSize: 13,
      },
      textStyle: {
        fontSize: 11,
        fontName: 'Sans-Serif',
        color: '#313638',
      },
    },
  };

  if (
    !chartDataIsFetching &&
    !chartDataIsLoading &&
    invoices &&
    invoices.length === 0
  ) {
    return chartError();
  }

  return (
    <div className="flex flex-col ">
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
          // height={'300px'}
        />
      </div>
    </div>
  );
};

export default PaymentChart;
