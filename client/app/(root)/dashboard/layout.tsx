import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import { RightSidebar } from '@/components/shared/RightSidebar';
import { LeftSidebar } from '@/components/shared/LeftSidebar';
import { Buttombar } from '@/components/shared/Buttombar ';
import { Topbar } from '@/components/shared/Topbar';

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
  return (
    <html lang="en">
      <body
        className={`${inter.className} tabPort:min-h-[100vh] tabPort:flex tabPort:flex-col`}
      >
        <Topbar />
        <main>
          <LeftSidebar />
          <section className="flex-1 bg-cyan-600">
            <div>{children}</div>
          </section>
          <RightSidebar />
        </main>
        <Buttombar />
      </body>
    </html>
  );
}
