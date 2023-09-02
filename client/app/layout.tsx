import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import ToasterProvider from '@/providers/toasterProvider';
import StoreProvider from '@/providers/store.provider';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Invoice Manager',
  description:
    'Generating, sending, managing invoices, and gaining financial insights',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StoreProvider>
        <ToasterProvider />
        <body className={inter.className}>{children}</body>
      </StoreProvider>
    </html>
  );
}
