'use client';
import { AiOutlineClose } from 'react-icons/ai';

import { toggleNotificationMobile } from '@/redux/features/dashboardToggle.slice';
import { toggleInvoice, updatePdfUrl } from '@/redux/features/invoice.slice';
import { useAppDispatch } from '@/redux/hooks';
import { Notification } from '@/types';

interface NotificationItemsProps {
  data: Notification;
}

const NotificationItems: React.FC<NotificationItemsProps> = ({
  data: { message, title, linkedTo },
}) => {
  const dispatch = useAppDispatch();

  const handleClick = (url: string) => {
    dispatch(updatePdfUrl(url));
    dispatch(toggleNotificationMobile());
    dispatch(toggleInvoice());
  };

  return (
    <button
      onClick={() => handleClick(linkedTo as string)}
      className="bg-blue-50 mb-[3px] flex items-center w-[100%] hover:bg-grey-50  rounded-md "
    >
      <div className="text-[0.72rem] w-[20%]  ml-1 mr-[6px] tabPort1:w-[10%]  my-3">
        <div className="font-bodyFont  tabPort2:text-[0.55rem] rounded-full bg-slate-200 flex justify-center items-center tabPort2:w-9 tabPort2:h-9 w-[40px] h-[40px]">
          INV
        </div>
      </div>
      <div className="flex flex-col items-start ml-auto w-[80%] tabPort1:w-[90%]">
        <div className="flex justify-between  w-[100%] items-center">
          <p className="font-medium text-[11px]  tabPort2:text-[9.5px] font-bodyFont  text-[#313638]">
            {title}
          </p>
          <div
            className="text-[12px] cursor-pointer "
            // onClick={handleClick}
          >
            <AiOutlineClose />
          </div>
        </div>
        <p className="text-[10px] w-[100%] text-start tabPort2:text-[8.5px] leading-normal mt-1 font-bodyFont font-medium text-[#313638]">
          {message}
        </p>
      </div>
    </button>
  );
};

export default NotificationItems;
