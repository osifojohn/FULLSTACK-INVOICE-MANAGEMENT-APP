import { OrganisationType } from '../models/organisation';

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

export interface IOrganisation {
  name: string;
  logoUrl?: string;
  phone: string;
  email: string;
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
  organisation: string;
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

type subtotal = number;
type invoiceNumber = number;
type moreDetails = string;

export type invoiceDetailType = InvoiceRequest &
  ClientTypes &
  OrganisationType &
  InvoiceItem &
  subtotal &
  invoiceNumber &
  moreDetails;

//  client,
//   organisation,
//   items,
//   dueDate,
//   moreDetails,
//   invoiceNumber,
