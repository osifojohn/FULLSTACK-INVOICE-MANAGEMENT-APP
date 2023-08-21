import cron from 'node-cron';

import { Organisation } from '../../models/organisation';
import { Invoice } from '../../models/invoice';
import { sendInvoiceOverdueNotification } from '../../utils/notificationService';

export const updateInvoiceStatus = async () => {
  //Task run everyday at midnight
  cron.schedule('0 0 * * *', async () => {
    try {
      const currentDate = new Date();
      const overdueInvoices = await Invoice.find({
        dueDate: { $lt: currentDate },
      });

      for (const invoice of overdueInvoices) {
        await Invoice.findByIdAndUpdate(invoice?._id, { status: 'Overdue' });

        const orgId = await Organisation.findById(invoice.orgId);

        if (orgId) {
          // Emit a real-time notification to the organization
          sendInvoiceOverdueNotification(orgId, invoice);
        }
      }

      console.log('Invoice statuses updated and notifications sent.');
    } catch (error) {
      console.error(
        'Error updating invoice statuses and sending notifications:',
        error
      );
    }
  });
};
