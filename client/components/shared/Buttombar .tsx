'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { leftSidebarLinks } from '@/constants/links';

export const Buttombar = () => {
  const pathname = usePathname();

  return (
    <div className="buttomBarContainer ">
      <div className=" tabPort1:flex justify-evenly items-center phone:h-9 ">
        {leftSidebarLinks.map(({ url, Icon, name }) => {
          const isActive =
            (pathname.includes(url) && url.length > 1) || pathname === url;

          return (
            <Link
              key={url}
              href={url}
              className={`flex  ${
                isActive && ''
              }  items-center h-[66px] mt-2 tabPort1:mt-0 phone:flex-col phone:justify-center`}
            >
              <div
                className={`text-[28px] phone:text-[24px] ${
                  isActive ? 'text-[#305c45]' : 'text-[#939393] '
                }  mr-2  phone:mr-0 `}
              >
                {<Icon />}
              </div>
              <p className=" text-[#939393] font-bodyFont phone:text-[13px] ">
                {name}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
