import useInvoiceChartData from '@/hooks/useInvoiceChartData';
import InvoiceChart from '@/components/charts/InvoiceChart';
import SelectDate from '@/components/DatePickers';
import { useInvoiceChartDateContext } from '@/context/dateContext';
import { InvoiceChartProps } from '@/types';
import { useAppSelector } from '@/redux/hooks';
import { selectDashboardToggle } from '@/redux/features/dashboardToggle.slice';

// const options = {
//   title: 'Invoice status',
//   is3D: true,
// };

const InvoiceStatusChart = ({
  invoices,
  chartDataIsLoading,
  chartDataIsFetching,
  chartError,
  chartLoading,
}: InvoiceChartProps) => {
  const { notification, leftSidebar } = useAppSelector(selectDashboardToggle);
  const data = useInvoiceChartData({
    invoices,
    row: 'Status',
    col: 'Count',
    isPieChart: true,
  });
  const options = {
    title: 'Invoice status',
    is3D: true,
    height: notification && leftSidebar ? 350 : 400,
  };

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
          // height={'400px'}
        />
      </div>
    </div>
  );
};

export default InvoiceStatusChart;
