import { type } from 'os';

export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface IOrganisation {
  name: string;
  logoUrl?: string;
  orgPhone: string;
  orgEmail: string;
  city: string;
  address: string;
  country: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUserAdmin extends ILogin {
  firstName: string;
  lastName: string;
  phone: string;
}

export type User = {
  firstName: string;
  orgName: string;
  accessToken: string;
  userId: string;
  orgId: string;
};

export type PaginationOptions = {
  page: number;
  limit: number;
};

type InvoiceItem = {
  item: string;
  quantity: number;
  description: string;
  price: number;
  amountSum: number;
  _id: string;
};

export type Invoice = {
  invoicePdf: {
    public_id: string;
    url: string;
  };
  _id: string;
  orgId: string;
  createdBy: string;
  clientId: string;
  clientName: string;
  items: InvoiceItem[];
  moreDetails: string;
  invoiceNumber: string;
  paidToDate: number;
  dueDate: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface InvoiceData {
  totalPages: number;
  currentPage: number;
  invoices: Invoice[];
}

export type GetInvoice = {
  page?: number;
  limit?: number;
};

export enum INVOICESTATUS {
  DRAFT = 'Draft',
  PENDING = 'Pending',
  PAID = 'Paid',
  OVERDUE = 'Overdue',
  PARTIALLY_PAID = 'Partially-paid',
}

export interface InvoiceChartProps {
  invoices: Invoice[] | undefined;
  chartDataIsFetching: boolean;
  chartDataIsLoading: boolean;
  chartLoading: () => JSX.Element;
  chartError: () => JSX.Element;
}

export interface Notification {
  _id: string;
  orgId: string;
  title: string;
  message: string;
  linkedTo?: string;
  type: string;
  status: 'seen' | 'not-seen';
}

export interface NotificationData {
  totalPages: number;
  currentPage: string;
  notifications: Notification[];
}
