import { selectDashboardToggle } from '@/redux/features/dashboardToggle.slice';
import { useAppSelector } from '@/redux/hooks';
import React from 'react';

export const RightSidebar = () => {
  const { leftSidebar } = useAppSelector(selectDashboardToggle);
  return (
    <div
      className={`tabPort:hidden shadow-shadow-1 rightSidebar h-[min-content]`}
    >
      helllo
    </div>
  );
};
