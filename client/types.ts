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
