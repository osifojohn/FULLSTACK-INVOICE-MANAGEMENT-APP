'use client';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { selectDashboardToggle } from '@/redux/features/dashboardToggle.slice';
import { selectInvoicePdf } from '@/redux/features/invoice.slice';
import { useSearchKeywordContext } from '@/context/searchKeywordContext';
import { useInvoiceChartDateContext } from '@/context/dateContext';
import ClientRevenueChart from './components/ClientRevenueChart';
import InvoiceStatusChart from './components/InvoiceStatusChart';
import InvoiceContent from '@/components/InvoiceContents';
import InvoiceColumns from '@/components/InvoiceColumn';
import InvoiceFilter from '@/components/InvoiceFilters';
import NoResultFound from '@/components/noResultFound';
import PaymentChart from './components/PaymentChart';
import SelectDate from '@/components/DatePickers';
import { useAppSelector } from '@/redux/hooks';
import PdfViewer from '@/components/pdfViewer';
import Loader from '@/components/Loader';
import { InvoiceData } from '@/types';
import {
  useGetSearchInvoiceByClientNameQuery,
  useGetInvoiceByDateRangeChartQuery,
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

  const { invoiceStartChartDate, setInvoiceStartChartDate } =
    useInvoiceChartDateContext();

  const { notification, leftSidebar, mobileNotification } = useAppSelector(
    selectDashboardToggle
  );
  const { showPdf } = useAppSelector(selectInvoicePdf);

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
    if (targetElement && searchInvoiceKeyword) {
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
    return <PdfViewer />;
  }

  return (
    <>
      <h1
        className={`text-[28px]  ${
          mobileNotification ? 'my-0' : 'my-5'
        } ml-5 hideDashboardTitle phone:text-[23px]  font-headingFont font-medium leading-[44px]`}
      >
        Dashboard
      </h1>

      <div className="flex flex-col justify-between    min-h-min">
        <div
          className={`chartFirstContainer  mx-3 ${
            notification && leftSidebar ? 'h-[330px]' : ''
          } ${
            !chartDataIsFetching &&
            !chartDataIsLoading &&
            chartData?.invoices &&
            chartData?.invoices.length !== 0 &&
            ' [&>*]:bg-[#fff] [&>*]:shadow-shadow-1 [&>*]:rounded-lg'
          }  `}
        >
          <div className="w-[53%] tabPort1:w-[100%] tabPort1:mb-8">
            {
              <ClientRevenueChart
                invoices={chartData?.invoices}
                chartDataIsFetching={chartDataIsFetching}
                chartDataIsLoading={chartDataIsLoading}
                chartLoading={chartLoading}
                chartError={chartError}
              />
            }
          </div>
          <div className="w-[45%] tabPort1:w-[100%]  ">
            {
              <InvoiceStatusChart
                invoices={chartData?.invoices}
                chartDataIsFetching={chartDataIsFetching}
                chartDataIsLoading={chartDataIsLoading}
                chartLoading={chartLoading}
                chartError={chartError}
              />
            }
          </div>
        </div>
        <div
          className={`${
            !chartDataIsFetching &&
            !chartDataIsLoading &&
            chartData?.invoices &&
            chartData?.invoices.length !== 0 &&
            'chartSecondContainer'
          }    mt-16  tabPort1:mt-6 mb-7 `}
        >
          {
            <PaymentChart
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
    </>
  );
}
