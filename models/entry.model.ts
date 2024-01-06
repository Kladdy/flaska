import { models, model, Schema, Document } from 'mongoose';

export interface IEntry {
  _id?: Schema.Types.ObjectId
  name: string,
  description: string,
  category: string,
  amount: number,
  location: string,
  origin: string,
  price: number,
  storage: string,
  links: [string],
};

const EntrySchema: Schema = new Schema<IEntry>({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  userId: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  amount: {
    type: Number,
  },
  location: {
    type: String,
  },
  origin: {
    type: String,
  },
  price: {
    type: Number,
  },
  storage: {
    type: String,
  },
  links: {
    type: [String],
    default: [],
  },
  imageSmall: {
    type: Buffer,
  },
  imageLarge: {
    type: Buffer,
  }
});

const EntryModel = models.Entry || model<IEntry>('Entry', EntrySchema);

export default EntryModel;

export type EntryDocument = Document & typeof EntryModel;