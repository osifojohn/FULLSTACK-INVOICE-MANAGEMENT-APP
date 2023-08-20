import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';

import { generateInvoiceNumber } from '../../utils/invoice-generateNumber';
import { Organisation, OrganisationType } from '../../models/organisation';
import { cloudinaryUploadStreamFn } from '../../utils/cloudinaryAndDbFns';
import { generateInvoicePdf } from '../../utils/pdf-generator';
import { Invoice, InvoiceType } from '../../models/invoice';
import { Client } from '../../models/client';

import {
  InvoiceRequest,
  STATUSCODE,
  UserAuthHeader,
  invoiceDetailsType,
} from '../../types';

export const handleCreateInvoice = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      clientId,
      items,
      dueDate,
      moreDetails,
      paidToDate,
    }: InvoiceRequest = req.body;

    const doc = new PDFDocument();

    const { userId, orgId }: UserAuthHeader = req.user;

    if (!clientId || typeof clientId !== 'string' || clientId === '') {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error('Invalid request');
    }

    const client = await Client.findById(clientId).exec();
    const organisation = await Organisation.findById(orgId).exec();
    const latestInvoice = await Invoice.findOne({ orgId })
      .sort({
        updatedAt: -1,
      })
      .exec();

    // getting sum per item and subTotal
    let subtotal = 0;
    items.forEach((item) => {
      //sum per item
      item.amountSum = item.quantity * item.price;
      // subTotal
      subtotal += item.amountSum;
    });

    const invoiceNumber = generateInvoiceNumber(
      organisation as OrganisationType,
      latestInvoice as InvoiceType
    );

    const fileName = invoiceNumber + '.pdf';

    const directoryPath = path.join(__dirname, '../..', 'invoices');
    const filePath = path.join(directoryPath, fileName);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }

    const writeStream = fs.createWriteStream(filePath);

    const invoiceDetails = {
      client,
      organisation,
      items,
      dueDate,
      moreDetails,
      invoiceNumber,
      subtotal,
      paidToDate,
    };

    generateInvoicePdf(doc, writeStream, invoiceDetails);

    const addInvoiceDetails = {
      orgId,
      userId,
      clientId,
      invoiceNumber,
      items,
      subtotal,
      moreDetails,
      dueDate,
      paidToDate,
      organizationName: organisation?.name,
    };

    writeStream.on('error', () => {
      res.status(STATUSCODE.SERVER_ERROR);
      throw new Error('Internal Server Error');
    });

    writeStream.on('finish', () => {
      const readStream = fs.createReadStream(filePath);

      res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
      res.setHeader('Content-Type', 'application/pdf');

      // Read the saved file and send it in the response and cloudinary
      readStream.on('open', () => {
        // Start piping the PDF data to the cloudinary
        readStream.pipe(
          cloudinaryUploadStreamFn(
            res,
            invoiceNumber,
            addInvoiceDetails as invoiceDetailsType
          )
        );

        // Start piping the PDF data to the response
        readStream.pipe(res);
      });

      // Clean up: close the read stream and delete the local PDF file
      readStream.on('close', () => {
        fs.unlinkSync(filePath);
      });

      readStream.on('error', () => {
        res.status(STATUSCODE.SERVER_ERROR);
        throw new Error('Internal or Server Error');
      });
    });
  }
);
