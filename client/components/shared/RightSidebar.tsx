'use client';
import InfiniteScroll from 'react-infinite-scroll-component';

import { selectDashboardToggle } from '@/redux/features/dashboardToggle.slice';
import NotificationItems from '../NotificationItems';
import { useAppSelector } from '@/redux/hooks';
import { Notification } from '@/types';
import Loader from '../Loader';

interface RightSidebarProps {
  isLoading: boolean;
  isFetching: boolean;
  fetchMoreNotificationData: () => void;
  notificationData: Notification[];
  notificationHasMore: boolean;
}

export const RightSidebar = ({
  fetchMoreNotificationData,
  notificationData,
  notificationHasMore,
}: RightSidebarProps) => {
  const { leftSidebar, mobileNotification, notification } = useAppSelector(
    selectDashboardToggle
  );

  return (
    <div
      className={` shadow-shadow-1 py-1  rightSidebar ${
        notification && leftSidebar && 'rightSidebarWithLeftSidebar'
      } ${notification && !leftSidebar && 'rightSidebarWithNoLeftSidebar '}  ${
        mobileNotification && 'rightSidebarMobile'
      } h-[min-content]`}
    >
      <InfiniteScroll
        dataLength={notificationData.length}
        next={fetchMoreNotificationData}
        hasMore={notificationHasMore}
        loader={
          <div className="text-center">
            <Loader />
          </div>
        }
        endMessage={
          <p className="text-center">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {notificationData &&
          notificationData.map((item) => (
            <NotificationItems key={item._id} data={item} />
          ))}
      </InfiniteScroll>
    </div>
  );
};
