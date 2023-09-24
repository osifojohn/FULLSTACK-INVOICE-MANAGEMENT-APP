'use client';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { useSearchKeywordContext } from '@/context/searchKeywordContext';
import InvoiceColumns from '@/components/invoiceColumns';
import InvoiceContent from '@/components/invoiceContent';
import InvoiceFilter from '@/components/invoiceFilter';
import NoResultFound from '@/components/noResultFound';
import ClientRevenue from './components/clientRevenue';
import Payment from './components/payment';
import Loader from '@/components/Loader';
import { InvoiceData } from '@/types';
import {
  useGetSearchInvoiceByClientNameQuery,
  useGetInvoiceByDateRangeQuery,
  useGetInvoiceByDateRangeChartQuery,
} from '@/redux/services/invoiceApi';
import InvoiceStatus from './components/invoiceStatus';

export default function Invoice() {
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<InvoiceData | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [startChartDate, setStartChartDate] = useState<any>(undefined);
  const [filterInput, setFilterInput] = useState<string>('all');
  // const { startDate, setStartDate } = useDateContext();

  const { keyword: searchInvoiceKeyword } = useSearchKeywordContext();
  const [searchPage, setSearchPage] = useState<number>(0);
  const [searchInvoiceData, setSearchInvoiceData] = useState<
    InvoiceData | undefined
  >(undefined);

  const {
    data: invoiceData,
    isLoading: invoiceDataLoading,
    isFetching: invoiceDataFetching,
  } = useGetInvoiceByDateRangeQuery({
    queryStartDate: startDate
      ? format(startDate as Date, 'yyyy-MM-dd')
      : undefined,
    page: page + 1,
  });
  const {
    data: searchedInvoiceData,
    isLoading: searchInvoiceDataIsLoading,
    isFetching: searchInvoiceDataIsFetching,
  } = useGetSearchInvoiceByClientNameQuery({
    page: searchPage + 1,
    keyword: searchInvoiceKeyword ? searchInvoiceKeyword : undefined,
  });

  const {
    data: chartData,
    isLoading: chartDataIsLoading,
    isFetching: chartDataIsFetching,
  } = useGetInvoiceByDateRangeChartQuery({
    queryStartDate: startChartDate ? startChartDate : undefined,
  });

  const filterInputEqualsAll = filterInput === 'all';

  useEffect(() => {
    if (searchInvoiceDataIsLoading || searchInvoiceDataIsFetching) {
      setFilterInput('all');
    }
    if (invoiceDataLoading || invoiceDataFetching) {
      setFilterInput('all');
    }
    if (filterInputEqualsAll) {
      setData(invoiceData);
    }
    if (!filterInputEqualsAll) {
      setData(data);
    }
    if (searchInvoiceKeyword && filterInputEqualsAll) {
      setSearchInvoiceData(searchedInvoiceData);
    }
    if (searchInvoiceKeyword && !filterInputEqualsAll) {
      setSearchInvoiceData(searchInvoiceData);
    }
  }, [
    page,
    invoiceData,
    data,
    filterInput,
    searchInvoiceKeyword,
    invoiceDataLoading,
    filterInputEqualsAll,
    searchInvoiceDataIsLoading,
    searchInvoiceDataIsFetching,
    invoiceDataFetching,
    searchedInvoiceData,
    searchInvoiceData,
  ]);

  return (
    <div className=" mx-3">
      <div className="chartFirstContainer">
        <div className="w-[65%] h-[10px]">
          {/* <ClientRevenue /> */}
          {(chartDataIsLoading || chartDataIsFetching) && (
            <div className="flex justify-center py-4 mt-7 mb-7">
              <Loader />
            </div>
          )}
          {!chartDataIsFetching &&
            !chartDataIsLoading &&
            chartData?.invoices.length === 0 && (
              <div className="flex justify-center py-4 mt-7 mb-7">
                <NoResultFound text="Can't load payment chart!" />
              </div>
            )}
          {chartData &&
            !chartDataIsFetching &&
            !chartDataIsLoading &&
            chartData.invoices.length !== 0 && (
              <ClientRevenue invoices={chartData?.invoices} />
            )}
        </div>
        <div className="w-[30%] h-[10px]">
          {(chartDataIsLoading || chartDataIsFetching) && (
            <div className="flex justify-center py-4 mt-7 mb-7">
              <Loader />
            </div>
          )}
          {!chartDataIsFetching &&
            !chartDataIsLoading &&
            chartData?.invoices.length === 0 && (
              <div className="flex justify-center py-4 mt-7 mb-40">
                <NoResultFound text="Can't load payment chart!" />
              </div>
            )}
          {chartData &&
            !chartDataIsFetching &&
            !chartDataIsLoading &&
            chartData.invoices.length !== 0 && (
              <InvoiceStatus
                invoices={chartData?.invoices}
                setStartChartDate={setStartChartDate}
              />
            )}
        </div>
      </div>
      <div className="chartSecondContainer  mx-3 my-8">
        {(invoiceDataLoading || invoiceDataFetching) && (
          <div className="flex justify-center py-12 mt-7 mb-7">
            <Loader />
          </div>
        )}
        {!chartDataIsFetching &&
          !chartDataIsLoading &&
          chartData?.invoices.length === 0 && (
            <div className="flex justify-center py-4 mt-7 mb-40">
              <NoResultFound text="Can't load payment chart!" />
            </div>
          )}
        {chartData &&
          !chartDataIsFetching &&
          !chartDataIsLoading &&
          chartData.invoices.length !== 0 && (
            <Payment invoices={chartData?.invoices} />
          )}
      </div>

      <div className="">
        <div className="flex flex-col">
          {data && (
            <InvoiceColumns
              startDate={startDate}
              setStartDate={setStartDate}
              searchInvoiceKeyword={searchInvoiceKeyword}
            />
          )}
          {!searchInvoiceKeyword && (
            <InvoiceFilter
              setData={setData}
              data={invoiceData}
              setFilterInput={setFilterInput}
              filterInput={filterInput}
            />
          )}
          {searchInvoiceKeyword && (
            <InvoiceFilter
              setData={setSearchInvoiceData}
              data={searchedInvoiceData}
              setFilterInput={setFilterInput}
              filterInput={filterInput}
            />
          )}
        </div>
        {searchInvoiceKeyword &&
          (searchInvoiceDataIsFetching || searchInvoiceDataIsLoading) && (
            <div className="flex justify-center mt-7 mb-40">
              <Loader />
            </div>
          )}
        {(invoiceDataLoading || invoiceDataFetching) && (
          <div className="flex justify-center  mt-7 mb-40">
            <Loader />
          </div>
        )}
        {searchInvoiceKeyword &&
          !searchInvoiceDataIsFetching &&
          !searchInvoiceDataIsLoading &&
          searchInvoiceData?.invoices.length === 0 && (
            <div className="flex justify-center  mt-7 mb-40">
              <NoResultFound text="No invoice found!" />
            </div>
          )}
        {!searchInvoiceKeyword &&
          !invoiceDataFetching &&
          !invoiceDataLoading &&
          data?.invoices.length === 0 && (
            <div className="flex justify-center  mt-7 mb-40">
              <NoResultFound text="No invoice found!" />
            </div>
          )}
        {!searchInvoiceKeyword &&
          !searchInvoiceDataIsFetching &&
          !invoiceDataFetching &&
          !invoiceDataLoading &&
          data &&
          data.invoices.length !== 0 && (
            <InvoiceContent invoice={data} setPage={setPage} />
          )}

        {searchInvoiceKeyword &&
          !searchInvoiceDataIsFetching &&
          searchInvoiceData &&
          searchInvoiceData.invoices.length !== 0 && (
            <InvoiceContent
              invoice={searchInvoiceData}
              setPage={setSearchPage}
            />
          )}
      </div>
    </div>
  );
}
