'use client';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';

import StoreProvider from '@/providers/store.provider';
import AuthProvider from '@/providers/auth.provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const metadata: Metadata = {
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
      <body className={inter.className}>
        <StoreProvider>
          <AuthProvider>
            {children as React.ReactElement}
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                className: '',
                style: {
                  border: '1px solid #713200',
                  padding: '16px',
                  color: '#713200',
                },
              }}
            />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
