import { createContext, useContext } from 'react';

export const InvoiceChartDateContext = createContext({
  invoiceStartChartDate: undefined,
  setInvoiceStartChartDate: (val: any) => {},
});

export function useInvoiceChartDateContext() {
  const value = useContext(InvoiceChartDateContext);
  return value;
}
