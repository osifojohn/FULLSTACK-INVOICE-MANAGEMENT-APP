'use client';
import { useState } from 'react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import { selectDashboardToggle } from '@/redux/features/dashboardToggle.slice';
import { SearchKeywordContext } from '@/context/searchKeywordContext';
import { RightSidebar } from '@/components/shared/RightSidebar';
import { LeftSidebar } from '@/components/shared/LeftSidebar';
import { Buttombar } from '@/components/shared/Buttombar ';
import { Topbar } from '@/components/shared/Topbar';
import { useAppSelector } from '@/redux/hooks';
import '../../app/globals.css';
import { DateContext } from '@/context/dateContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Invoice Manager',
  description:
    'Generating, sending, managing invoices, and gaining financial insights with just one click and tab',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [keyword, setKeyword] = useState('');
  const [startDate, setStartDate] = useState<any>(undefined);
  const { notification, leftSidebar } = useAppSelector(selectDashboardToggle);

  return (
    <html lang="en">
      <body
        className={`${inter.className} tabPort:min-h-[100vh]  tabPort:flex tabPort:flex-col items-center `}
      >
        <DateContext.Provider value={{ startDate, setStartDate }}>
          <SearchKeywordContext.Provider value={{ keyword, setKeyword }}>
            <Topbar />
            <main className="flex  pt-[100px]">
              {leftSidebar && <LeftSidebar />}
              <section className={`mx-3 centerContainer flex-1`}>
                <div className="">{children}</div>
              </section>
              {notification && <RightSidebar />}
            </main>
            <Buttombar />
          </SearchKeywordContext.Provider>
        </DateContext.Provider>
      </body>
    </html>
  );
}
