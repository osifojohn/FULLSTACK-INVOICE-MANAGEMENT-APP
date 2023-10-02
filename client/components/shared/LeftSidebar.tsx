'use client';
import { leftSidebarLinks } from '@/constants/links';
import UserContainer from '../userContainer';

export const LeftSidebar = () => {
  return (
    <div className={`tabPort:hidden  shadow-shadow-1 leftSidebar`}>
      <div>
        {leftSidebarLinks.map(({ url, Icon, name }) => (
          <button
            key={url}
            className="flex items-center tabPort2:flex-col tabPort2:justify-center  h-[66px] leftSidebarBtn mt-2 tabPort2:h-[50px]"
          >
            <div className="">{<Icon />}</div>
            <p className="leftSidebarBtnText font-bodyFont tabPort2:text-[14px]">
              {name}
            </p>
          </button>
        ))}
      </div>
      <UserContainer />
    </div>
  );
};
