'use client';
import { toggleInvoice } from '@/redux/features/invoice.slice';
import { useAppDispatch } from '@/redux/hooks';
import { AiOutlineClose } from 'react-icons/ai';
import { Document, Page } from 'react-pdf';

interface PdfViewerProps {
  file: string;
  onDocumentLoadSuccess: any;
  pageNumber: number;
  numPages: number;
}

const PdfViewer = ({
  file,
  onDocumentLoadSuccess,
  numPages,
  pageNumber,
}: PdfViewerProps) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleInvoice());
  };

  return (
    <div className="w-[100%] max-w-[300px] mt-5 pl-10 flex  ">
      <div className="flex flex-col ">
        <div
          className="ml-auto text-[30px] z-[1]  cursor-pointer"
          onClick={handleClick}
        >
          <AiOutlineClose />
        </div>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    </div>
  );
};
export default PdfViewer;
