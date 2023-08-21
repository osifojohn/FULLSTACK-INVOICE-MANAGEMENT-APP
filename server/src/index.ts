import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';

import { initializeCloudinaryConfigurations } from './utils/cloudinaryAndDbFns';
import { errorHandler } from './middlewares/errorHandler';
import expense from './routes/expenseRoutes';
import invoice from './routes/invoiceRoutes';
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

/* ROUTES */
app.use('/auth', register);
app.use('/client', client);
app.use('/expense', expense);
app.use('/invoice', invoice);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
const server = createServer(app);

/* Socket.io SETUP */
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
  },
});

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
