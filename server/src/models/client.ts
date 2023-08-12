import { Schema, InferSchemaType, model } from 'mongoose';

const ClientSchema = new Schema(
  {
    fullname: { type: String, required: true },
    companyName: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

type Client = InferSchemaType<typeof ClientSchema>;

export default model<Client>('Client', ClientSchema);
