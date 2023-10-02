import { createContext, useContext } from 'react';

export const PdfContext = createContext({
  isShowPdf: false,
  setIsShowPdf: (val: boolean) => {},
  numPages: 1,
  setNumPages: (val: number) => {},
  pageNumber: 1,
  setPageNumber: (val: number) => {},
  pdfUrl: '',
  setPdfUrl: (val: string) => {},
});

export function usePdfContext() {
  const value = useContext(PdfContext);
  return value;
}
