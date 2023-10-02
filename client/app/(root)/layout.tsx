'use client';
import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import { selectDashboardToggle } from '@/redux/features/dashboardToggle.slice';
import { SearchKeywordContext } from '@/context/searchKeywordContext';
import { InvoiceChartDateContext } from '@/context/dateContext';
import { RightSidebar } from '@/components/shared/RightSidebar';
import { LeftSidebar } from '@/components/shared/LeftSidebar';
import { Buttombar } from '@/components/shared/Buttombar ';
import { Topbar } from '@/components/shared/Topbar';
import { useAppSelector } from '@/redux/hooks';
import '../../app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Invoice Manager',
  description:
    'Generating, sending, managing invoices, and gaining financial insights with just one click and tab',
};
import { pdfjs } from 'react-pdf';
import { NotificationSkipContext } from '@/context/notificationSkipContext';
import { useGetAllNotificationsQuery } from '@/redux/services/notificationApi';
import { Notification } from '@/types';
import { selectInvoicePdf } from '@/redux/features/invoice.slice';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [keyword, setKeyword] = useState('');
  const [invoiceStartChartDate, setInvoiceStartChartDate] =
    useState<any>(undefined);
  const { notification, leftSidebar, mobileNotification } = useAppSelector(
    selectDashboardToggle
  );
  const [notificationSkip, setNotificationSkip] = useState<boolean>(true);
  const [notificationPage, setNotificationPage] = useState<number>(1);
  const [notificationHasMore, setNotificationHasMore] = useState<boolean>(true);
  const [notificationData, setNotificationData] = useState<Notification[]>([]);
  const { showPdf } = useAppSelector(selectInvoicePdf);

  const {
    data: notifications,
    isLoading: notificationDataIsLoading,
    isFetching: notificationDataIsFetching,
    error: notificationError,
  } = useGetAllNotificationsQuery(
    {
      page: notificationPage,
      limit: 10,
    },
    {
      skip: notificationSkip,
    }
  );
  const fetchMoreNotificationData = () => {
    notifications &&
      notifications.notifications?.length === 0 &&
      setNotificationHasMore(false);

    if (!notificationDataIsLoading) {
      setNotificationData((prevItems: Notification[]) => {
        return [
          ...prevItems,
          ...(notifications?.notifications as Notification[]),
        ];
      });

      if (notifications) {
        notifications?.notifications?.length > 0
          ? setNotificationHasMore(true)
          : setNotificationHasMore(false);

        notifications.notifications?.length !== 0 &&
          setNotificationPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    if (notifications && notifications.currentPage === '1') {
      setNotificationData(notifications.notifications as Notification[]);
    }
  }, [notifications, notificationData]);

  return (
    <html lang="en">
      <body
        className={`${inter.className} tabPort1:min-h-[100vh]   tabPort1:flex tabPort1:flex-col   max-w-[100vw] `}
      >
        <NotificationSkipContext.Provider
          value={{ notificationSkip, setNotificationSkip }}
        >
          <InvoiceChartDateContext.Provider
            value={{ invoiceStartChartDate, setInvoiceStartChartDate }}
          >
            <SearchKeywordContext.Provider value={{ keyword, setKeyword }}>
              <Topbar />
              <main className="flex pt-[100px] tabPort1:pb-[79px] w-[100%]">
                {leftSidebar && <LeftSidebar />}
                <section
                  className={`centerContainer ${
                    notification && 'centerContainerNotificationActive'
                  } ${
                    !mobileNotification &&
                    !showPdf &&
                    'centerContainerNotificationMobile'
                  } `}
                >
                  <div className="w-[100%]">{children}</div>
                </section>
                {notification && (
                  <RightSidebar
                    fetchMoreNotificationData={fetchMoreNotificationData}
                    isLoading={notificationDataIsLoading}
                    isFetching={notificationDataIsFetching}
                    notificationData={notificationData as Notification[]}
                    notificationHasMore={notificationHasMore}
                  />
                )}
              </main>
              <Buttombar />
            </SearchKeywordContext.Provider>
          </InvoiceChartDateContext.Provider>
        </NotificationSkipContext.Provider>
      </body>
    </html>
  );
}
