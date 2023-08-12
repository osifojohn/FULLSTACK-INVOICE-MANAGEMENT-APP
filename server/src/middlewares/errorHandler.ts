import { NextFunction, Request, Response } from 'express';

import { STATUSCODE } from '../types';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case STATUSCODE.BAD_REQUEST:
      res.json({
        title: 'Validation Failed',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUSCODE.NOT_FOUND:
      res.json({
        title: 'Not Found',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUSCODE.UNAUTHORIZED:
      res.json({
        title: 'Unauthorized',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUSCODE.FORBIDDEN:
      res.json({
        title: 'Forbidden',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUSCODE.SERVER_ERROR:
      res.json({
        title: 'Internal or Server Error',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log('No Error, All good !');
  }
};
