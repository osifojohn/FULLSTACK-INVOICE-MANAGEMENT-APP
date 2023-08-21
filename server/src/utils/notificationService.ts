import { io } from '..';
import { InvoiceType } from '../models/invoice';

const sendInvoiceOverdueNotification = (
  orgId,
  invoice: InvoiceType & { _id: string }
) => {
  try {
    io.on('connection', (socket) => {
      // Emit a real-time notification to organizations
      io.to(orgId).emit('invoiceOverdue', invoice._id);
    });
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

export { sendInvoiceOverdueNotification };
