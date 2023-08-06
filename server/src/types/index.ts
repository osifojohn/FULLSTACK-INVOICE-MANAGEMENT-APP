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
  phone?: string;
  email?: string;
  address?: string;
  country?: string;
}

export interface IUserRequestAdmin {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  organisation: string;
}

export interface ILogin {
  email: string;
  password: string;
}
