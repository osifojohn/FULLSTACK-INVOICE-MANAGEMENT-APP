'use client';
import clientRevenueChart from '@/components/charts/clientRevenueChart';
import incomeStatusChart from '@/components/charts/invoiceStatusChart';
import paymentLineChart from '@/components/charts/paymentLineChart';
import invoiceColumns from '@/components/invoiceColumns';
import invoiceContent from '@/components/invoiceContent';

import dynamic from 'next/dynamic';

const clientRevenueChartNoSSR = dynamic(
  () => import('../../../components/charts/clientRevenueChart'),
  {
    ssr: false,
  }
);

export default function Dashboard() {
  return (
    <div className=" mx-3">
      <div className="chartFirstContainer">
        <div className="w-[65%] h-[10px]"> {clientRevenueChart()}</div>
        <div className="w-[30%] h-[10px]">{incomeStatusChart()}</div>
      </div>
      <div className=" chartSecondContainer m-3">{paymentLineChart()}</div>

      <div className="">
        <div>{invoiceColumns()}</div>
        <div>{invoiceContent()}</div>
      </div>
    </div>
  );
}
