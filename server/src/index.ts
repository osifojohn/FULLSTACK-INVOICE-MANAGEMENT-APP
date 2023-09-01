import bodyParser from 'body-parser';
import { createServer } from 'http';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import { updateOverdueInvoicesAndAddToNotification } from './utils/updateInvoiceStatus';
import { initializeCloudinaryConfigurations } from './utils/cloudinaryAndDbFns';
import { SocketConnection } from './utils/socketConnection';
import { errorHandler } from './middlewares/errorHandler';

import expense from './routes/expenseRoutes';
import invoice from './routes/invoiceRoutes';
import payment from './routes/paymentRoutes';
import message from './routes/messageRoute';
import register from './routes/authRoutes';
import client from './routes/clientRoutes';

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.json());
app.use(cors());

initializeCloudinaryConfigurations();
const server = createServer(app);

/* ROUTES */
app.use('/auth', register);
app.use('/client', client);
app.use('/expense', expense);
app.use('/invoice', invoice);
app.use('/payment', payment);
app.use('/message', message);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

/* Socket.io SETUP */
const connectionInstance = new SocketConnection(server);
const io = connectionInstance.getIO();

updateOverdueInvoicesAndAddToNotification();

/* MONGOOSE SETUP */
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

export { io };
