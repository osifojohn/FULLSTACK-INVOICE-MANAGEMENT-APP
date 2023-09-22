'use client';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { useSearchKeywordContext } from '@/context/searchKeywordContext';
import InvoiceColumns from '@/components/invoiceColumns';
import InvoiceFilter from '@/components/invoiceFilter';
import NoResultFound from '@/components/noResultFound';
import InvoiceContent from '@/components/invoiceContent';
import ClientRevenue from './components/clientRevenue';
import IncomeStatus from './components/incomeStatus';
import Payment from './components/payment';
import Loader from '@/components/Loader';
import { InvoiceData } from '@/types';
import {
  useGetSearchInvoiceByClientNameQuery,
  useGetInvoiceByDateRangeQuery,
} from '@/redux/services/invoiceApi';

export default function Invoice() {
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<InvoiceData | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [filterInput, setFilterInput] = useState<string>('all');

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
          <ClientRevenue />
        </div>
        <div className="w-[30%] h-[10px]">
          <IncomeStatus />
        </div>
      </div>
      <div className=" chartSecondContainer m-3">
        <Payment />
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
