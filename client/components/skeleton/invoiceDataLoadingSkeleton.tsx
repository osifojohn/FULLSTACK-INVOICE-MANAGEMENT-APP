import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import InvoiceFilterSkeleton from './invoiceFilterSkeleton';

const InvoiceDataLoadingSkeleton = () => {
  return (
    <div className="">
      <div className="flex flex-col">
        <InvoiceFilterSkeleton />
      </div>
      {/* <InvoiceContentSkeleton /> */}
    </div>
  );
};

export default InvoiceDataLoadingSkeleton;
