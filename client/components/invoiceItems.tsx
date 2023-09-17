'use client';
import React, { useMemo, useState } from 'react';

import Pagination from './pagination/pagination';
import data from '../data/mock-data.json';

let PageSize = 10;

const InvoiceItems = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{showInvoice()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between bg-white items-center py-5 border-solid border-b-[#939393] border-b-[1px]">
        <div className="flex items-center gap-2 ml-4">
          <button className="font-bodyFont text-[15px]">Back</button>
          <p className="font-bodyFont text-[15px]">1 of 40</p>
          <button className="font-bodyFont text-[15px]">Next</button>
        </div>
        <div>
          {' '}
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={PageSize}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
};

function showInvoice() {
  return <button>Action</button>;
}

export default InvoiceItems;
