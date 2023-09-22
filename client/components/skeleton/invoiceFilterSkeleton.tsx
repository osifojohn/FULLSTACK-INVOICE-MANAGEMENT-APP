import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const InvoiceFilterSkeleton = () => {
  return (
    <div className=" shadow-shadow-1  invoiceColumnBtn border-solid border-t-gray-300 border-b-[1px]">
      {Array(6)
        .fill(0)
        .map((_, i) => {
          return (
            <button key={i}>
              <Skeleton />
            </button>
          );
        })}
    </div>
  );
};

export default InvoiceFilterSkeleton;
