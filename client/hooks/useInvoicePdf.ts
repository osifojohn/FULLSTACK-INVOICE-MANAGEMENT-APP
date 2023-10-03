import { selectInvoicePdf, setNumPages } from '@/redux/features/invoice.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const useInvoicepdf = () => {
  const dispatch = useAppDispatch();
  const { numPages } = useAppSelector(selectInvoicePdf);

  function onDocumentLoadSuccess({
    numPages: numPages,
  }: {
    numPages: number;
  }): void {
    dispatch(setNumPages(numPages));
  }

  return onDocumentLoadSuccess;
};

export default useInvoicepdf;
