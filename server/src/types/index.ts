export enum STATUSCODE {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  ACCEPTED = 202,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export enum INVOICESTATUS {
  DRAFT = 'Draft',
  PENDING = 'Pending',
  PAID = 'Paid',
  NOT_PAID = 'Not-paid',
  OVERDUE = 'Overdue',
  PARTIALLY_PAID = 'Partially-paid',
}

export enum NOTIFICATIONTYPE {
  INVOICE = 'Invoice',
}
export enum NOTIFICATIONSTATUS {
  NOT_SEEN = 'not-seen',
  SEEN = 'seen',
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

export interface IUserRequestAdmin extends ILogin {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface IClient {
  name: string;
  email: string;
  country: string;
  city: string;
  postalCode: string;
  telephone: number;
  address: string;
}

export type PaginationOptions = {
  page: number;
  limit: number;
};

export type expenseRequest = {
  orgId: string;
  userId: string;
  name: string;
  category: string;
  description?: string;
  amount: number;
  receipt?: string;
};

export type UserAuthHeader = {
  firstName: string;
  email: string;
  userId: string;
  role: string;
  orgId: string;
};

type InvoiceItem = [
  {
    item: string;
    quantity: number;
    description: string;
    price: number;
    amountSum: number;
  }
];

export type InvoiceRequest = {
  clientId: string;
  items: InvoiceItem;
  invoiceUrl?: string;
  invoiceNumber?: string;
  moreDetails: string;
  dueDate: Date;
  totalPrice?: number;
  status?: string;
  paidToDate: number;
};

export interface invoiceDetailsType {
  orgId: string;
  userId: string;
  clientId: string;
  items: InvoiceItem;
  dueDate: Date;
  moreDetails: string;
  invoiceNumber: string;
  subtotal: number;
  paidToDate: number;
  organizationName: string;
  clientName?: string;
}

export interface paymentRequest {
  amount: number;
  linkedTo: string;
}

export interface sendInvoiceRequest {
  clientId: string;
  message: string;
  mailSubject: string;
}
