import { InvoiceType } from '../models/invoice';
import { OrganisationType } from '../models/organisation';

export function generateInvoiceNumber(
  organisation: OrganisationType,
  latestInvoice: InvoiceType
) {
  let initials;
  let increment;

  increment = '100';

  if (latestInvoice) {
    increment = Number(latestInvoice.invoiceNumber?.slice(12)) + 1;
  }

  if (organisation) {
    initials = organisation?.name.slice(0, 3)?.toUpperCase();
  }

  const today = new Date();

  const datePart = `${today.getFullYear()}${
    today.getMonth() + 1
  }${today.getDate()}`;

  return `${initials}-${datePart}-${increment}`;
}
