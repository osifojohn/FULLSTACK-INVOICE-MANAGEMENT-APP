'use client';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { selectInvoicePdf, setNumPages } from '@/redux/features/invoice.slice';
import { useSearchKeywordContext } from '@/context/searchKeywordContext';
import { useInvoiceChartDateContext } from '@/context/dateContext';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import InvoiceColumns from '@/components/invoiceColumns';
import InvoiceContent from '@/components/invoiceContent';
import InvoiceFilter from '@/components/invoiceFilter';
import NoResultFound from '@/components/noResultFound';
import ClientRevenue from './components/clientRevenue';
import InvoiceStatus from './components/invoiceStatus';
import SelectDate from '@/components/datePicker';
import Payment from './components/payment';
import Loader from '@/components/Loader';
import { InvoiceData } from '@/types';
import {
  useGetSearchInvoiceByClientNameQuery,
  useGetInvoiceByDateRangeChartQuery,
  useGetInvoiceByDateRangeQuery,
} from '@/redux/services/invoiceApi';
import PdfViewer from '@/components/pdfViewer';

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

  const { invoiceStartChartDate, setInvoiceStartChartDate } =
    useInvoiceChartDateContext();

  const { showPdf, numPages, pageNumber, pdfUrl } =
    useAppSelector(selectInvoicePdf);

  const dispatch = useAppDispatch();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    dispatch(setNumPages(numPages));
  }

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
    queryStartDate: invoiceStartChartDate
      ? format(invoiceStartChartDate as Date, 'yyyy-MM-dd')
      : undefined,
  });

  const filterInputEqualsAll = filterInput === 'all';

  useEffect(() => {
    const targetElement = document.getElementById('invoiceTableSection');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
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

  const chartLoading = () => (
    <div className="flex justify-center py-4 mt-7 mb-7">
      <Loader />
    </div>
  );

  const chartError = () => (
    <div className="flex flex-col py-4 mt-7 mb-7 ">
      <div className="ml-auto">
        <SelectDate
          startDate={invoiceStartChartDate}
          setStartDate={setInvoiceStartChartDate}
        />
      </div>
      <NoResultFound text="Error loading chart or data does not exist!" />
    </div>
  );

  const invoiceTableLoading = () => (
    <div className="flex justify-center mt-7 mb-40">
      <Loader />
    </div>
  );

  const invoiceTableError = () => (
    <div className="flex justify-center  mt-7 mb-40">
      <NoResultFound text="No invoice found!" />
    </div>
  );

  if (showPdf) {
    return (
      <PdfViewer
        file={pdfUrl}
        onDocumentLoadSuccess={onDocumentLoadSuccess}
        pageNumber={pageNumber}
        numPages={numPages}
      />
    );
  }

  return (
    <div className=" mx-3">
      <div className="chartFirstContainer">
        <div className="w-[53%] h-[10px]">
          {
            <ClientRevenue
              invoices={chartData?.invoices}
              chartDataIsFetching={chartDataIsFetching}
              chartDataIsLoading={chartDataIsLoading}
              chartLoading={chartLoading}
              chartError={chartError}
            />
          }
        </div>
        <div className="w-[45%] h-[10px]">
          {
            <InvoiceStatus
              invoices={chartData?.invoices}
              chartDataIsFetching={chartDataIsFetching}
              chartDataIsLoading={chartDataIsLoading}
              chartLoading={chartLoading}
              chartError={chartError}
            />
          }
        </div>
      </div>
      <div className="chartSecondContainer  mx-3 my-8">
        {
          <Payment
            invoices={chartData?.invoices}
            chartDataIsFetching={chartDataIsFetching}
            chartDataIsLoading={chartDataIsLoading}
            chartLoading={chartLoading}
            chartError={chartError}
          />
        }
      </div>

      <div className="">
        <div className="flex flex-col" id="invoiceTableSection">
          {
            <InvoiceColumns
              startDate={startDate}
              setStartDate={setStartDate}
              searchInvoiceKeyword={searchInvoiceKeyword}
              data={data}
            />
          }

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
          (searchInvoiceDataIsFetching || searchInvoiceDataIsLoading) &&
          invoiceTableLoading()}

        {(invoiceDataLoading || invoiceDataFetching) && invoiceTableLoading()}

        {searchInvoiceKeyword &&
          !searchInvoiceDataIsFetching &&
          !searchInvoiceDataIsLoading &&
          searchInvoiceData?.invoices.length === 0 &&
          invoiceTableError()}

        {!searchInvoiceKeyword &&
          !invoiceDataFetching &&
          !invoiceDataLoading &&
          data?.invoices.length === 0 &&
          invoiceTableError()}

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
