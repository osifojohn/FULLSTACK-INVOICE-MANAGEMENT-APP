import { BsHouseDoor } from 'react-icons/bs';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { MdPeopleOutline } from 'react-icons/md';
import { TbMoneybag } from 'react-icons/tb';

export const routes = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  LANDING: '/landing',
  ROOT: '/',
};

export const leftSidebarLinks = [
  { url: '/dashboard/home', Icon: BsHouseDoor, name: 'Dashboard' },
  {
    url: '/dashboard/invoice',
    Icon: LiaFileInvoiceDollarSolid,
    name: 'Invoice',
  },
  { url: '/dashboard/customers', Icon: MdPeopleOutline, name: 'Customers' },
  { url: '/dashboard/payments', Icon: TbMoneybag, name: 'Payments' },
];
