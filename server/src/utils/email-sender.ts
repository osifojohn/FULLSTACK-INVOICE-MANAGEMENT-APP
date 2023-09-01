import nodemailer from 'nodemailer';

const html = `
<h1>Hello world</h1>
<p>Is't nodemailer useful</p>
`;

async function sendEmail() {
  nodemailer.createTransport({});
}

sendEmail();
