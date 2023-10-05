'use client';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { pdfjs } from 'react-pdf';
import { useState } from 'react';

import { selectDashboardToggle } from '@/redux/features/dashboardToggle.slice';
import { NotificationSkipContext } from '@/context/notificationSkipContext';
import { SearchKeywordContext } from '@/context/searchKeywordContext';
import { selectInvoicePdf } from '@/redux/features/invoice.slice';
import { InvoiceChartDateContext } from '@/context/dateContext';
import { RightSidebar } from '@/components/shared/RightSidebar';
import { LeftSidebar } from '@/components/shared/LeftSidebar';
import { Buttombar } from '@/components/shared/Buttombar ';
import { Topbar } from '@/components/shared/Topbar';
import { useAppSelector } from '@/redux/hooks';
import '../../app/globals.css';

const inter = Inter({ subsets: ['latin'] });

const metadata: Metadata = {
  title: 'Invoice Manager',
  description:
    'Generating, sending, managing invoices, and gaining financial insights with just one click and tab',
};

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
  const { showPdf } = useAppSelector(selectInvoicePdf);

  return (
    <html lang="en">
      <body
        className={`${inter.className} tabPort1:min-h-[100vh] tabPort1:flex tabPort1:flex-col   max-w-[100vw] `}
      >
        <NotificationSkipContext.Provider
          value={{ notificationSkip, setNotificationSkip }}
        >
          <InvoiceChartDateContext.Provider
            value={{ invoiceStartChartDate, setInvoiceStartChartDate }}
          >
            <SearchKeywordContext.Provider value={{ keyword, setKeyword }}>
              <Topbar />
              <main
                className={`flex ${
                  mobileNotification
                    ? 'pt-[100px] phone:pt-[75px]'
                    : 'pt-[100px]'
                } tabPort1:pb-[79px] w-[100%]`}
              >
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
                {notification && <RightSidebar />}
              </main>
              <Buttombar />
            </SearchKeywordContext.Provider>
          </InvoiceChartDateContext.Provider>
        </NotificationSkipContext.Provider>
      </body>
    </html>
  );
}
