'use client';
import Image from 'next/image';
import React from 'react';
import { BsHouseDoor } from 'react-icons/bs';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { MdPeopleOutline } from 'react-icons/md';
import { TbMoneybag } from 'react-icons/tb';

import myImg from '../../public/images/my-img.jpg';

export const LeftSidebar = () => {
  return (
    <div className=" w-[18%] tabPort:hidden   shadow-shadow-1 leftSidebar pt-6">
      <div>
        <button className="flex items-center h-[66px] leftSidebarBtn leftSidebarBtnActive">
          <div className="">
            <BsHouseDoor />
          </div>
          <p className="leftSidebarBtnText">Dashboard</p>
        </button>
        <div className="flex items-center h-[66px]">
          <div>
            <LiaFileInvoiceDollarSolid />
          </div>
          <p>Invoice</p>
        </div>
        <div className="flex items-center h-[66px]">
          <div>
            <MdPeopleOutline />
          </div>
          <p>Customers</p>
        </div>
        <div>
          <div>
            <TbMoneybag />
          </div>
          <p>Payment</p>
        </div>
      </div>
      <div className="flex items-center pb-3">
        <div className="mr-2">
          <Image
            src={myImg}
            alt="me"
            width={30}
            height={30}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-bodyFont font-medium flex justify-center text-lg">
            John
          </p>
          <p className="text-gray-400 text-[13px]">Admin</p>
        </div>
      </div>
    </div>
  );
};
