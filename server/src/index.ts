import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

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

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

// const createCollections = async (models) => {
//   await Promise.all(models.map((model) => model.createCollection()));
// };

// const options: ConnectOptions = {
//   readPreference: 'secondary',
// };
// (async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL, options);

//     await createCollections(models);

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.log(`${error} did not connect`);
//   }
// })();
