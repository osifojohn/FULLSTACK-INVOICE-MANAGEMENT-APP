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

  const button =
    'bg-gray-300 border-none text-black p-4 list-none text-lg my-2 rounded-full cursor-pointer';

  return (
    <div className="w-[100%]   mt-2 flex flex-col items-center justify-center">
      {numPages > 1 ? (
        <div className="flex items-center justify-between mx-auto mt-4">
          <button
            onClick={() => dispatch(goToPrevPage)}
            className={`${button} bg-gray-300 text-black`}
          >
            Prev
          </button>
          <button
            onClick={() => dispatch(goToNextPage)}
            className={`${button} bg-blue-500 text-white`}
          >
            Next
          </button>
          <p className="text-lg bg-gray-300 p-4">
            Page {pageNumber} of {numPages}
          </p>
        </div>
      ) : (
        <p className="text-lg text-center font-headingFont ">
          Page {pageNumber} of {numPages}
        </p>
      )}

      <div className="flex flex-col  phone:w-[100%] ">
        <div
          className="ml-auto   text-[30px] z-[1]  cursor-pointer"
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
