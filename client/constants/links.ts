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
  { url: '/dashboard', Icon: BsHouseDoor, name: 'Dashboard' },
  { url: '/invoice', Icon: LiaFileInvoiceDollarSolid, name: 'Invoice' },
  { url: '/customers', Icon: MdPeopleOutline, name: 'Customers' },
  { url: '/payments', Icon: TbMoneybag, name: 'Payments' },
];
