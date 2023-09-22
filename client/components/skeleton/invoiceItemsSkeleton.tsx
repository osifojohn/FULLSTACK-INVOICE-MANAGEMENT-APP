'use client';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../pagination/pagination.css';

const InvoiceItemsSkeleton = () => {
  return (
    <>
      <table>
        <thead>
          <tr>
            {Array(6)
              .fill(0)
              .map((_, i) => {
                return (
                  <th key={i}>
                    <Skeleton width={30} />
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {Array(6)
            .fill(0)
            .map((_, i) => {
              return (
                <tr key={i} className="flex">
                  <Skeleton width={30} />
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default InvoiceItemsSkeleton;
