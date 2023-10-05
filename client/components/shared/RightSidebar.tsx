'use client';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

import { selectDashboardToggle } from '@/redux/features/dashboardToggle.slice';
import { useNotificationSkipContext } from '@/context/notificationSkipContext';
import { useGetAllNotificationsQuery } from '@/redux/services/notificationApi';
import NotificationItems from '../NotificationItems';
import { useAppSelector } from '@/redux/hooks';
import { Notification } from '@/types';
import { selectInvoicePdf } from '@/redux/features/invoice.slice';

export const RightSidebar = () => {
  const [notificationPage, setNotificationPage] = useState<number>(1);
  const [notificationHasMore, setNotificationHasMore] = useState<boolean>(true);
  const [notificationData, setNotificationData] = useState<Notification[]>([]);

  const { leftSidebar, mobileNotification, notification } = useAppSelector(
    selectDashboardToggle
  );
  const { showPdf } = useAppSelector(selectInvoicePdf);

  const { notificationSkip } = useNotificationSkipContext();

  const { data: notifications, isLoading: notificationDataIsLoading } =
    useGetAllNotificationsQuery(
      {
        page: notificationPage,
        limit: 10,
      },
      {
        skip: notificationSkip,
      }
    );
  const fetchMoreNotificationData = () => {
    if (!notificationDataIsLoading && notifications) {
      +notifications.currentPage === notifications.totalPages
        ? setNotificationHasMore(false)
        : setNotificationHasMore(true);

      setNotificationPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (notifications && +notifications.currentPage === 1) {
      setNotificationData(notifications.notifications as Notification[]);
    }

    if (
      notifications &&
      +notifications.currentPage !== 1 &&
      +notifications.currentPage === notificationPage
    ) {
      setNotificationData((prevItems: Notification[]) => {
        return [
          ...prevItems,
          ...(notifications?.notifications as Notification[]),
        ];
      });
    }
  }, [notifications, notificationPage]);

  return (
    <div
      className={` shadow-shadow-1 py-1  rightSidebar ${
        notification && leftSidebar && 'rightSidebarWithLeftSidebar'
      } ${notification && !leftSidebar && 'rightSidebarWithNoLeftSidebar '}  ${
        mobileNotification && 'rightSidebarMobile'
      } `}
    >
      <InfiniteScroll
        dataLength={notificationData?.length}
        next={fetchMoreNotificationData}
        hasMore={notificationHasMore}
        loader={
          <div className="text-center">
            <BeatLoader color="#36d7b7" loading speedMultiplier={1} />
          </div>
        }
        endMessage={
          <p className="text-center font-bodyFont text-[9.5px] text-gray-600">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {notificationData &&
          notificationData.map((item) => (
            <NotificationItems key={item?._id} data={item} />
          ))}
      </InfiniteScroll>
    </div>
  );
};
