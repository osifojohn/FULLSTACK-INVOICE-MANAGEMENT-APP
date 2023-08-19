import fs from 'fs';

export function generateInvoicePdf(
  doc: PDFKit.PDFDocument,
  writeStream: fs.WriteStream,
  invoice
) {
  doc.pipe(writeStream);
  // Add content to the PDF
  generateHeader(doc, invoice);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc, invoice);
  // Finalize the PDF
  doc.end();
}

function generateHeader(doc, invoice) {
  doc
    .fillColor('#444444')
    .fontSize(20)
    .text(invoice.organisation.name, 110, 57)
    .fontSize(10)
    .text(invoice.organisation.address, 200, 65, { align: 'right' })
    .text(invoice.organisation.country, 200, 80, { align: 'right' })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc.fillColor('#444444').fontSize(20).text('Invoice', 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text('Invoice no:', 50, customerInformationTop)
    .font('Helvetica-Bold')
    .text(invoice.invoiceNumber, 150, customerInformationTop)
    .font('Helvetica')
    .text('Invoice Date:', 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text('Balance Due:', 50, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.subtotal - invoice.paidToDate),
      150,
      customerInformationTop + 30
    )

    .font('Helvetica-Bold')
    .text(invoice.client.name, 300, customerInformationTop)
    .font('Helvetica')
    .text(invoice.client.address, 300, customerInformationTop + 15)
    .text(
      invoice.client.city +
        ', ' +
        invoice.client.state +
        ', ' +
        invoice.client.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;
  // const { retrivedClient } = invoice;

  doc.font('Helvetica-Bold');
  generateTableRow(
    doc,
    invoiceTableTop,
    'Item',
    'Description',
    'Unit Cost',
    'Quantity',
    'Line Total'
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font('Helvetica');

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      formatCurrency(item.price),
      item.quantity,
      formatCurrency(item.amountSum)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    '',
    '',
    'Subtotal',
    '',
    formatCurrency(invoice.subtotal)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    '',
    '',
    'Paid To Date',
    '',
    formatCurrency(invoice.paidToDate)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font('Helvetica-Bold');
  generateTableRow(
    doc,
    duePosition,
    '',
    '',
    'Balance Due',
    '',
    formatCurrency(invoice.subtotal - invoice.paidToDate)
  );
  doc.font('Helvetica');
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  price,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(price, 280, y, { width: 90, align: 'right' })
    .text(quantity, 370, y, { width: 90, align: 'right' })
    .text(lineTotal, 0, y, { align: 'right' });
}

function generateFooter(doc, invoice) {
  doc.fontSize(10).text(`${invoice.moreDetails}`, 50, 600, { align: 'center' });
}

function generateHr(doc, y) {
  doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(val) {
  return '$' + val.toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + '/' + month + '/' + day;
}
