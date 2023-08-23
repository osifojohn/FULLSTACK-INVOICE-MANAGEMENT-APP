import cron from 'node-cron';

import { INVOICESTATUS, NOTIFICATIONSTATUS, NOTIFICATIONTYPE } from '../types';
import { Notification } from '../models/notification';
import { Invoice } from '../models/invoice';

export const updateOverdueInvoicesAndAddToNotification = async () => {
  //cron job scheduled  to run everyday at midnight (0:00)
  cron.schedule('0 0 * * *', async () => {
    try {
      const currentDate = new Date();

      const overdueInvoices = await Invoice.find({
        dueDate: { $lt: currentDate },
        status: { $ne: INVOICESTATUS.OVERDUE },
      });

      for (const invoice of overdueInvoices) {
        await Invoice.findByIdAndUpdate(invoice?._id, {
          status: INVOICESTATUS.OVERDUE,
        });

        const notification = new Notification({
          orgId: invoice.orgId,
          title: 'Invoice Overdue',
          message: `Invoice ${invoice?.invoiceNumber} is overdue `,
          status: NOTIFICATIONSTATUS.NOT_SEEN,
          type: NOTIFICATIONTYPE.INVOICE,
          linkedTo: invoice?._id,
        });

        notification.save();
      }
    } catch (error) {
      throw new Error('Error updating invoice statuses and notification');
    }
  });
};
