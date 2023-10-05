'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { leftSidebarLinks } from '@/constants/links';
import UserContainer from '../userContainer';

export const LeftSidebar = () => {
  const pathname = usePathname();

  return (
    <div className={`tabPort1:hidden  shadow-shadow-1 leftSidebar`}>
      <div>
        {leftSidebarLinks.map(({ url, Icon, name }) => {
          const isActive =
            (pathname.includes(url) && url.length > 1) || pathname === url;

          return (
            <Link
              key={url}
              href={url}
              className={`flex ${
                isActive && 'leftSidebarBtnActive '
              }  items-center tabPort2:flex-col tabPort2:justify-center h-[66px] leftSidebarBtn mt-2 tabPort2:h-[50px]`}
            >
              <div className="">{<Icon />}</div>
              <p className="leftSidebarBtnText font-bodyFont tabPort2:text-[14px]">
                {name}
              </p>
            </Link>
          );
        })}
      </div>
      <UserContainer />
    </div>
  );
};
