'use client';
import SelectDate from '@/components/DatePickers';

import { useInvoiceChartDateContext } from '@/context/dateContext';
import useInvoiceChartData from '@/hooks/useInvoiceChartData';

import { InvoiceChartProps } from '@/types';
import { useAppSelector } from '@/redux/hooks';
import { selectDashboardToggle } from '@/redux/features/dashboardToggle.slice';
import InvoiceChart from '@/components/charts/InvoiceChart';

const ClientRevenueChart = ({
  invoices,
  chartDataIsLoading,
  chartDataIsFetching,
  chartError,
  chartLoading,
}: InvoiceChartProps) => {
  const { invoiceStartChartDate, setInvoiceStartChartDate } =
    useInvoiceChartDateContext();

  const { leftSidebar, notification } = useAppSelector(selectDashboardToggle);

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

  const options = {
    title: 'Clients Contributions',
    // width: 900,
    // legend: { position: 'none' },
    chart: {
      title: 'Chess opening moves',
      subtitle: 'popularity by percentage',
    },
    bars: 'horizontal',
    axes: {
      x: {
        0: { side: 'top', label: 'Percentage' },
      },
    },
    bar: { groupWidth: '90%' },
    height: notification && leftSidebar ? 350 : 400,
    hAxis: {
      // title: 'Amount',
      titleTextStyle: {
        fontSize: 13,
      },
      textStyle: {
        fontSize: 12,
        fontName: 'Sans-Serif',
        color: '#313638',
      },
    },
    vAxis: {
      // title: 'Clients',
      titleTextStyle: {
        fontSize: 12,
      },
      textStyle: {
        fontSize: 10,
        fontName: 'Sans-Serif',
        color: '#313638',
      },
    },
  };

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
          height={`${leftSidebar && notification ? '300px' : '400px'}`}
        />
      </div>
    </div>
  );
};

export default ClientRevenueChart;
