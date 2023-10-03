import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

interface InvoicePdf {
  showPdf: boolean;
  numPages: number;
  pageNumber: number;
  pdfUrl: string;
}

const initialState: InvoicePdf = {
  showPdf: false,
  numPages: 1,
  pageNumber: 1,
  pdfUrl: '',
};

export const invoiceSlice = createSlice({
  initialState,
  name: 'invoiceSlice',
  reducers: {
    toggleInvoice: (state) => {
      state.showPdf = !state.showPdf;
    },
    updatePdfUrl: (state, action) => {
      state.pdfUrl = action.payload;
    },
    setNumPages: (state, action) => {
      state.numPages = action.payload;
    },
    goToPrevPage: (state) => {
      state.numPages = state.numPages - 1;
    },
    goToNextPage: (state) => {
      state.numPages = state.numPages + 1;
    },
  },
});

export const selectInvoicePdf = (state: RootState) => state.invoicePdf;

export const {
  toggleInvoice,
  updatePdfUrl,
  setNumPages,
  goToPrevPage,
  goToNextPage,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
