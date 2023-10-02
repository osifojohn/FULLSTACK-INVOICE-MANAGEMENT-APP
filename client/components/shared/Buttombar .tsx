'use client';
import { leftSidebarLinks } from '@/constants/links';

export const Buttombar = () => {
  return (
    <div className="buttomBarContainer">
      <div className=" tabPort1:flex justify-evenly">
        {leftSidebarLinks.map(({ url, Icon, name }) => (
          <button
            key={url}
            className="flex items-center h-[66px] mt-2 tabPort2:h-[50px] phone:flex-col"
          >
            <div className="text-[28px] phone:text-[24px] text-[#939393] mr-2">
              {<Icon />}
            </div>
            <p className=" text-[#939393] font-bodyFont  phone:text-[13px] ">
              {name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
