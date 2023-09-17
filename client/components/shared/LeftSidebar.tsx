'use client';

import { leftSidebarLinks } from '@/constants/links';
import userContainer from '../userContainer';
import { useAppSelector } from '@/redux/hooks';
import { selectDashboardToggle } from '@/redux/features/dashboardToggle.slice';

export const LeftSidebar = () => {
  const { notification, leftSidebar } = useAppSelector(selectDashboardToggle);
  return (
    <div className={`tabPort:hidden shadow-shadow-1 leftSidebar`}>
      <div>
        {leftSidebarLinks.map(({ url, Icon, name }) => (
          <button
            key={url}
            className="flex items-center h-[66px] leftSidebarBtn mt-2"
          >
            <div className="">{<Icon />}</div>
            <p className="leftSidebarBtnText font-bodyFont">{name}</p>
          </button>
        ))}
      </div>
      {userContainer()}
    </div>
  );
};
