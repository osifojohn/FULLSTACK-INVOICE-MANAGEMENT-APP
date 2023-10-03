'use client';
import { LiaBarsSolid } from 'react-icons/lia';
import { LuBell } from 'react-icons/lu';

import { useNotificationSkipContext } from '@/context/notificationSkipContext';
import { useAppDispatch } from '@/redux/hooks';
import UserContainer from '../userContainer';
import SearchBar from '../searchBar';
import Logo from '../Logo';
import {
  toggleLeftSidebar,
  toggleNotification,
  toggleNotificationMobile,
} from '@/redux/features/dashboardToggle.slice';

export const Topbar = () => {
  const dispatch = useAppDispatch();
  const { setNotificationSkip } = useNotificationSkipContext();

  const handleNotificationClick = (val: string) => {
    if (val === '>900px') {
      setNotificationSkip(false);
      dispatch(toggleNotificationMobile());
      dispatch(toggleNotification());
    }
    if (val === '<900px') {
      setNotificationSkip(false);
      // dispatch(toggleLeftSidebar());
      dispatch(toggleNotification());
      dispatch(toggleNotificationMobile());
    }
  };

  return (
    <div className="w-[100%] fixed z-10 topbar">
      <div className="relative">
        <button
          className=" absolute top-[2.2rem] left-6 tabPort1:hidden  cursor-pointer"
          onClick={() => dispatch(toggleLeftSidebar())}
        >
          <LiaBarsSolid className="w-14 h-5" />
        </button>
        <div className=" w-[100%] pr-[20px] phone:pr-0  h-[100px]  flex items-center shadow-shadow-1 bg-white">
          <div className="w-[300px]  flex  justify-center tabPort1:hidden">
            <Logo height={130} width={130} />
          </div>
          <div className="flex items-center flex-1  w-[100%]">
            <h1 className="text-[28px] mr-3 tabPort1:hidden tabPort2:text-[24px] font-headingFont font-medium leading-[44px]">
              Dashboard
            </h1>
            <div className="flex items-center relative phone:ml-[10px]  w-[100%]">
              <div className="hidden tabPort1:block">
                <UserContainer isTopbar={true} />
              </div>
              <div className=" tabPort1:mx-auto ">
                <SearchBar />
              </div>
              <button
                className="hidden tabPort1:block   tabPort1:mr-1"
                onClick={() => handleNotificationClick('<900px')}
              >
                <LuBell className="h-7 w-7  tabPort1:w-8 tabPort1:h-8 cursor-pointer" />
              </button>

              <div className="flex justify-between items-center ml-auto tabPort1:hidden">
                <button
                  className="mr-5 tabPort1:hidden tabPort1:mr-0"
                  onClick={() => handleNotificationClick('>900px')}
                >
                  <LuBell className="h-7 w-7 tabPort2:h-5 tabPort2:w-5  cursor-pointer" />
                </button>
                <UserContainer isTopbar={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
