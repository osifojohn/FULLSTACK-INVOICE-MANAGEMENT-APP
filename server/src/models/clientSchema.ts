import { Schema, InferSchemaType, model } from 'mongoose';

const ClientSchema = new Schema(
  {
    fullname: { type: String, required: true },
    companyName: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    country: { type: String, required: true },
    invoice: {
      type: [
        {
          url: String,
          number: String,
          status: {
            enum: [
              'draft',
              'pending',
              'not-paid',
              'overdue',
              'partially-paid',
              'paid',
            ],
            default: 'draft',
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

type Client = InferSchemaType<typeof ClientSchema>;

export default model<Client>('Client', ClientSchema);
