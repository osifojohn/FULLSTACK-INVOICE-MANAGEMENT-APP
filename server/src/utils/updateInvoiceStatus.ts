import cron from 'node-cron';

import { Notification } from '../models/notification';
import { Invoice } from '../models/invoice';

export const updateOverdueInvoicesAndAddToNotification = async () => {
  //cron job scheduled  to run everyday at midnight (0:00)
  cron.schedule('0 0 * * *', async () => {
    try {
      const currentDate = new Date();

      const overdueInvoices = await Invoice.find({
        dueDate: { $lt: currentDate },
        status: { $ne: 'overdue' },
      });

      for (const invoice of overdueInvoices) {
        await Invoice.findByIdAndUpdate(invoice?._id, {
          status: 'overdue',
        });

        const notification = new Notification({
          orgId: invoice.orgId,
          title: 'Invoice Overdue',
          message: `Invoice ${invoice?.invoiceNumber} is overdue `,
          status: 'not-seen',
          type: 'Invoice',
          linkedTo: invoice?._id,
        });

        notification.save();
      }
    } catch (error) {
      throw new Error('Error updating invoice statuses and notification');
    }
  });
};
