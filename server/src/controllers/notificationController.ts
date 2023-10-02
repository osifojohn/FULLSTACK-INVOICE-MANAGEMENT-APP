import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

import { NOTIFICATIONSTATUS, STATUSCODE } from '../types';
import { Notification } from '../models/notification';

//@route fetch /notication/all-notifications
//@access private
export const getAllNotification = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { orgId } = req.user;

  const pageNum = Number(page);
  const limitNum = Number(limit);

  const notifications = await Notification.find({
    orgId,
  })
    .limit((limitNum as number) * 1)
    .skip((pageNum - 1) * limitNum)
    .exec();

  const count = await Notification.count();

  res.json({
    totalPages: Math.ceil(count / limitNum),
    currentPage: page,
    notifications,
  });
});

//@route delete /notication/notification-seen
//@access private
export const setNotificationToSeen = asyncHandler(
  async (req: Request, res: Response) => {
    const { notificationId } = req.body;

    if (!notificationId) {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error('Provide  notificationId');
    }

    const updatedNotification = await Notification.findByIdAndUpdate({
      _id: notificationId,
      $set: {
        status: NOTIFICATIONSTATUS.SEEN,
      },
    });

    res.json(updatedNotification);
  }
);

//@route delete /notication/delete
//@access private
export const deleteNotification = asyncHandler(
  async (req: Request, res: Response) => {
    const { notificationId } = req.body;

    if (!notificationId) {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error('Provide  notificationId');
    }

    const deletedInvoiceNofication = await Notification.findOneAndDelete({
      _id: notificationId,
    });

    res.json(deletedInvoiceNofication);
  }
);
