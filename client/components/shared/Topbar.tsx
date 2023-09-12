'use client';
import { BsSearch } from 'react-icons/bs';
import { LiaBarsSolid } from 'react-icons/lia';
import { LuBell } from 'react-icons/lu';
import React, { useEffect } from 'react';
import Logo from '../Logo';
import Image from 'next/image';

import myImg from '../../public/images/my-img.jpg';
import {
  toggleLeftSidebar,
  toggleNotification,
} from '@/redux/features/dashboardToggle.slice';
import { useAppDispatch } from '@/redux/hooks';

export const Topbar = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(toggleNotification());
    }, 5000);
  }, [dispatch]);

  return (
    <div className="relative">
      <button
        className=" absolute top-[4.5rem] left-52  cursor-pointer"
        onClick={() => dispatch(toggleLeftSidebar())}
      >
        <LiaBarsSolid className="w-10 h-5" />
      </button>
      <div className=" w-[100%] pr-[20px]  h-[100px] flex items-center shadow-shadow-1 bg-white">
        <div className="w-[300px] flex   justify-center">
          <Logo height={130} width={130} />
        </div>
        <div className="flex items-center flex-1 justify-between ">
          <h1 className="text-[28px]   font-headingFont font-medium leading-[44px]">
            Dashboard
          </h1>
          <div className="flex items-center relative">
            <div className="relative flex items-center  mr-10">
              <div className="absolute left-2 top-5 ">
                <BsSearch className="h-3 w-8 " />
              </div>
              <input
                placeholder="Search..."
                className="w-96 h-14 text-lg font-normal leading-10 pl-[40px] pr-14 pt-3.5 pb-4 rounded-lg border border-zinc-400 hover:border-zinc-400  focus:border-none"
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                className="mr-5"
                onClick={() => dispatch(toggleNotification())}
              >
                <LuBell className="h-7 w-7 cursor-pointer" />
              </button>
              <div className="flex items-center">
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
          </div>
        </div>
      </div>
    </div>
  );
};
