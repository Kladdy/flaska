import { models, model, Schema } from 'mongoose';

const EntrySchema: Schema = new Schema({
  name: {
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
});

const EntryModel = models.Entry || model('Entry', EntrySchema);

export default EntryModel;