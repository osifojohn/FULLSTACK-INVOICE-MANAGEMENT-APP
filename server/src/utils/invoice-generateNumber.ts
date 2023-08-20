import { InvoiceType } from '../models/invoice';
import { OrganisationType } from '../models/organisation';

export function generateInvoiceNumber(
  organisation: OrganisationType,
  latestInvoice: InvoiceType
) {
  let increment;

  increment = '100';

  if (latestInvoice) {
    increment = Number(latestInvoice.invoiceNumber?.slice(12)) + 1;
  }

  const initials = organisation?.name.slice(0, 3)?.toUpperCase();

  const today = new Date();

  const datePart = `${today.getFullYear()}${
    today.getMonth() + 1
  }${today.getDate()}`;

  console.log(`${initials}-${datePart}-${increment}`);

  return `${initials}-${datePart}-${increment}`;
}
