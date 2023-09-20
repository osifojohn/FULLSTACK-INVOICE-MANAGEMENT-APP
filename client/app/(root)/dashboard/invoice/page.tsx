'use client';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { useGetInvoiceByDateRangeQuery } from '@/redux/services/invoiceApi';
import clientRevenueChart from '@/components/charts/clientRevenueChart';
import incomeStatusChart from '@/components/charts/invoiceStatusChart';
import paymentLineChart from '@/components/charts/paymentLineChart';
import Pagination from '@/components/pagination/pagination';
import InvoiceColumns from '@/components/invoiceColumns';
import InvoiceFilter from '@/components/invoiceFilter';
import NoResultFound from '@/components/noResultFound';
import InvoiceItems from '@/components/invoiceItems';
import { InvoiceData } from '@/types';

export default function Invoice() {
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<InvoiceData | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const { data: invoiceData, isLoading } = useGetInvoiceByDateRangeQuery({
    queryStartDate: startDate
      ? format(startDate as Date, 'yyyy-MM-dd')
      : undefined,
    page: page + 1,
  });

  useEffect(() => {
    setData(invoiceData);
  }, [page, invoiceData]);

  return (
    <div className=" mx-3">
      <div className="chartFirstContainer">
        <div className="w-[65%] h-[10px]"> {clientRevenueChart()}</div>
        <div className="w-[30%] h-[10px]">{incomeStatusChart()}</div>
      </div>
      <div className=" chartSecondContainer m-3">{paymentLineChart()}</div>

      <div className="">
        <div className="flex flex-col  ">
          <InvoiceColumns startDate={startDate} setStartDate={setStartDate} />
          {!isLoading && data?.invoices.length !== 0 && <InvoiceFilter />}
        </div>
        {isLoading && (
          <div className="font-bodyFont text-center text-xl text-gray-500 ">
            Loading...
          </div>
        )}
        {data?.invoices.length === 0 && (
          <NoResultFound text="No invoice found!" />
        )}
        {data && data?.invoices.length !== 0 && (
          <>
            <div className="bg-white shadow-shadow-1">
              <InvoiceItems data={data} />
            </div>
            <div className="flex  mt-5 justify-between bg-white items-center w-[100%] py-5 pl-10 pr-16 border-solid border-b-[#939393] border-b-[1px]">
              <p className="font-bodyFont text-[17px]">{`${data?.currentPage} of ${data?.totalPages} `}</p>
              <div>
                <Pagination totalPages={data?.totalPages} setPage={setPage} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
