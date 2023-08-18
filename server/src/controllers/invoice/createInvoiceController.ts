import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import path from 'path';
import PDFDocument from 'pdfkit';
import fs from 'fs';

import { InvoiceRequest, STATUSCODE, UserAuthHeader } from '../../types';
import Client from '../../models/client';
import Organisation from '../../models/organisation';
import Invoice from '../../models/invoice';

export const handleCreateInvoice = asyncHandler(
  async (req: Request, res: Response) => {
    const { clientId, items, dueDate, moreDetails }: InvoiceRequest = req.body;

    const doc = new PDFDocument();

    const { userId, orgId }: UserAuthHeader = req.user;

    if (!clientId || typeof clientId !== 'string' || clientId === '') {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error('Invalid request');
    }

    let invoiceNumber;
    let invoiceNumberLetters;
    let lastInvoiceNumberIncrement;

    const retrivedClient = await Client.findById(clientId).exec();
    const organisation = await Organisation.findById(orgId).exec();

    invoiceNumberLetters = organisation?.name.slice(0, 3)?.toUpperCase();

    if (organisation?.invoiceNumbers?.length === 0) {
      lastInvoiceNumberIncrement = '100';
      invoiceNumber = invoiceNumberLetters + lastInvoiceNumberIncrement;
    }

    if (organisation?.invoiceNumbers?.length !== 0) {
      const lastItem = organisation?.invoiceNumbers.length - 1;
      const lastInvoiceNumberIncrement =
        Number(organisation?.invoiceNumbers[lastItem].slice(3)) + 1;

      invoiceNumber = invoiceNumberLetters + lastInvoiceNumberIncrement;
    }

    // getting sum per item and subTotal
    let subtotal = 0;
    items.forEach((item) => {
      //sum per item
      item.amountSum = item.quantity * item.price;
      // subTotal
      subtotal += item.amountSum;
    });

    await Invoice.create({
      createdBy: userId,
      clientId,
      invoiceNumber,
      items,
      totalPrice: subtotal,
      moreDetails,
      dueDate,
      organizationName: organisation?.name,
    });

    const fileName = invoiceNumber + '.pdf';

    const directoryPath = path.join(__dirname, '../..', 'invoices');
    const filePath = path.join(directoryPath, fileName);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }

    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    // Add content to the PDF
    doc.fontSize(20).text('Invoice', { align: 'center' });
    doc.fontSize(12).text('Customer: John Doe');
    doc.fontSize(12).text('Amount: $100');
    // Finalize the PDF
    doc.end();

    writeStream.on('finish', () => {
      // Read the saved file and send it in the response
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.status(STATUSCODE.SERVER_ERROR);
          throw new Error('Internal Server Error');
        } else {
          /// Add invoice number to list of invoices
          organisation?.invoiceNumbers.push(invoiceNumber);
          organisation?.save();

          res.setHeader('Content-Disposition', `inline; filename=${fileName}`);
          res.setHeader('Content-Type', 'application/pdf');
          res.send(data);
        }
      });
    });
  }
);

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + '/' + month + '/' + day;
}
