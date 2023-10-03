'use client';
import { AiOutlineClose } from 'react-icons/ai';
import { Document, Page } from 'react-pdf';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import useInvoicepdf from '@/hooks/useInvoicePdf';
import {
  goToNextPage,
  goToPrevPage,
  selectInvoicePdf,
  toggleInvoice,
  updatePdfUrl,
} from '@/redux/features/invoice.slice';

const PdfViewer = () => {
  const dispatch = useAppDispatch();

  const { numPages, pageNumber, pdfUrl } = useAppSelector(selectInvoicePdf);

  const onDocumentLoadSuccess = useInvoicepdf();

  const handleClick = () => {
    dispatch(updatePdfUrl(''));
    dispatch(toggleInvoice());
  };

  return (
    <div className="w-[100%] max-w-[300px] mt-5 pl-10">
      {numPages > 1 ? (
        <div>
          <button onClick={() => dispatch(goToPrevPage)}>Prev</button>
          <button onClick={() => dispatch(goToNextPage)}>Next</button>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      ) : (
        <p>
          Page {pageNumber} of {numPages}
        </p>
      )}

      <div className="flex flex-col ">
        <div
          className="ml-auto text-[30px] z-[1]  cursor-pointer"
          onClick={handleClick}
        >
          <AiOutlineClose />
        </div>
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    </div>
  );
};
export default PdfViewer;
