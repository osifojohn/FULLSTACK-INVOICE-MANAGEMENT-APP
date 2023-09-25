import { Invoice } from '@/types';

interface InvoiceChartDataProps {
  invoices: Invoice[] | undefined;
  row: string;
  col: string;
  isPieChart?: boolean;
}

const useInvoiceChartData = ({
  invoices,
  row,
  col,
  isPieChart = false,
}: InvoiceChartDataProps) => {
  //worst cases analysis: time complexity => O(n), space complexity => O(n)
  const invoiceDataMap = new Map();

  const statusCounts: { [status: string]: number } = {};

  if (isPieChart) {
    invoices?.forEach((invoice) => {
      const status = invoice.status;
      if (statusCounts[status]) {
        statusCounts[status]++;
      } else {
        statusCounts[status] = 1;
      }
    });
  } else {
    invoices?.forEach((invoice) => {
      const clientName = invoice.clientName;
      const paidToDate = invoice.paidToDate;

      if (invoiceDataMap.has(clientName)) {
        const currentTotal = invoiceDataMap.get(clientName);
        invoiceDataMap.set(clientName, currentTotal + paidToDate);
      } else {
        invoiceDataMap.set(clientName, paidToDate);
      }
    });
  }

  const invoiceDataArray = Array.from(invoiceDataMap);

  const data: Array<[string, number | string]> = [[row, col]];

  if (isPieChart) {
    for (const [status, count] of Object.entries(statusCounts)) {
      data.push([status, count]);
    }
  } else {
    invoiceDataArray.forEach(([clientName, totalPaid]) => {
      data.push([clientName, totalPaid]);
    });
  }

  return data;
};

export default useInvoiceChartData;
