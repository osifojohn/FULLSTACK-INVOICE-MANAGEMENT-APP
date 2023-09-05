import { selectDashboardToggle } from '@/redux/features/dashboardToggle.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React from 'react';

export const Topbar = () => {
  const count = useAppSelector(selectDashboardToggle);
  const dispatch = useAppDispatch();
  return <div className="bg-red-300 fixed w-[100%]">Topbar</div>;
};
