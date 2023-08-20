import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { Invoice, InvoiceType } from '../models/invoice';
import { STATUSCODE, invoiceDetailsType } from '../types';
import { Response } from 'express';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

const addInvoiceToDB = (
  result: UploadApiResponse,
  addInvoiceDetails: invoiceDetailsType
) => {
  const {
    orgId,
    userId,
    clientId,
    invoiceNumber,
    items,
    subtotal,
    moreDetails,
    dueDate,
    paidToDate,
    organizationName,
  } = addInvoiceDetails;

  const invoice = new Invoice({
    orgId,
    invoicePdf: {
      public_id: result?.public_id,
      url: result?.secure_url,
    },
    createdBy: userId,
    clientId,
    invoiceNumber,
    items,
    totalPrice: subtotal,
    moreDetails,
    dueDate,
    paidToDate,
    organizationName,
  });
  invoice.save();
};

const updateInvoiceToDB = async (
  result: UploadApiResponse,
  editInvoiceDetails: invoiceDetailsType,
  latestInvoice: InvoiceType & { _id: string }
) => {
  const {
    orgId,
    userId,
    clientId,
    invoiceNumber,
    items,
    subtotal,
    moreDetails,
    dueDate,
    paidToDate,
    organizationName,
  } = editInvoiceDetails;

  const newInvoice = {
    orgId,
    invoicePdf: {
      public_id: result?.public_id,
      url: result?.secure_url,
    },
    createdBy: userId,
    clientId,
    invoiceNumber,
    items,
    totalPrice: subtotal,
    moreDetails,
    dueDate,
    paidToDate,
    organizationName,
  };

  await Invoice.findOneAndUpdate(
    { _id: latestInvoice?._id.toString() },
    newInvoice,
    { new: true }
  );
};

const cloudinaryUploadStreamFn = (
  res: Response<unknown, Record<string, unknown>>,
  invoiceNumber: string,
  addInvoiceDetails: invoiceDetailsType
) =>
  cloudinary.uploader.upload_stream(
    {
      access_mode: 'public',
      resource_type: 'auto',
      public_id: `${invoiceNumber}`,
      folder: 'invoices',
    },
    (error, result) => {
      if (error) {
        res.status(STATUSCODE.SERVER_ERROR);
        throw new Error('Internal or Server Error');
      } else {
        addInvoiceToDB(result as UploadApiResponse, addInvoiceDetails);
      }
    }
  );

const cloudinaryDestroyAndUpdateStreamFn = (
  res: Response<unknown, Record<string, unknown>>,
  invoiceNumber: string,
  editInvoiceDetails: invoiceDetailsType,
  latestInvoice: InvoiceType
) => {
  /// remove previous pdf file from cloudinary
  cloudinary.uploader.destroy(latestInvoice?.invoicePdf?.public_id as string);

  return cloudinary.uploader.upload_stream(
    {
      access_mode: 'public',
      resource_type: 'auto',
      public_id: `${invoiceNumber}`,
      folder: 'invoices',
    },
    (error, result) => {
      if (error) {
        res.status(STATUSCODE.SERVER_ERROR);
        throw new Error('Internal or Server Error');
      } else {
        updateInvoiceToDB(
          result as UploadApiResponse,
          editInvoiceDetails,
          latestInvoice as InvoiceType & { _id: string }
        );
      }
    }
  );
};

export {
  cloudinaryUploadStreamFn,
  cloudinaryDestroyAndUpdateStreamFn,
  addInvoiceToDB,
};
