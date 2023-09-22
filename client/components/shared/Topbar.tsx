'use client';
import { LiaBarsSolid } from 'react-icons/lia';
import { LuBell } from 'react-icons/lu';
import React from 'react';
import Logo from '../Logo';
import {
  toggleLeftSidebar,
  toggleNotification,
} from '@/redux/features/dashboardToggle.slice';
import { useAppDispatch } from '@/redux/hooks';
import userContainer from '../userContainer';
import SearchBar from '../searchBar';

export const Topbar = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="w-[100%] fixed z-10">
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
              <SearchBar />
              <div className="flex justify-between items-center">
                <button
                  className="mr-5"
                  onClick={() => dispatch(toggleNotification())}
                >
                  <LuBell className="h-7 w-7 cursor-pointer" />
                </button>
                {userContainer()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
