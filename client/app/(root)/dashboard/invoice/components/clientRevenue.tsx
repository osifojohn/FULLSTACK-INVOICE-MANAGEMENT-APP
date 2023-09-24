import React from 'react';

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

import ChartComponent from '@/components/charts/chart';
import useInvoiceChartData from '@/hooks/useInvoiceChartData';
import { Invoice } from '@/types';

const ClientRevenue = ({ invoices }: { invoices: Invoice[] }) => {
  const data = useInvoiceChartData({
    invoices,
    row: 'Paid to date',
    col: 'Client Name',
  });

  return (
    <div>
      <ChartComponent
        data={data}
        options={options}
        chartType={'BarChart'}
        width={'100%'}
        height={'400px'}
      />
    </div>
  );
};

export default ClientRevenue;
