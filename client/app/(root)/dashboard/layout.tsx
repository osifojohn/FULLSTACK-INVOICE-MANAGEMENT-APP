'use client';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import { selectDashboardToggle } from '@/redux/features/dashboardToggle.slice';
import { RightSidebar } from '@/components/shared/RightSidebar';
import { LeftSidebar } from '@/components/shared/LeftSidebar';
import { Buttombar } from '@/components/shared/Buttombar ';
import { Topbar } from '@/components/shared/Topbar';
import { useAppSelector } from '@/redux/hooks';
import '../../../app/globals.css';

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
  const { notification, leftSidebar } = useAppSelector(selectDashboardToggle);

  return (
    <html lang="en">
      <body
        className={`${inter.className} tabPort:min-h-[100vh] tabPort:flex tabPort:flex-col`}
      >
        <Topbar />
        <main className="flex">
          {leftSidebar && <LeftSidebar />}
          <section className="mx-3 flex-1 ">
            <div>{children}</div>
          </section>
          {notification && <RightSidebar />}
        </main>

        <Buttombar />
      </body>
    </html>
  );
}
