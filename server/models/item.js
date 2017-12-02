import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: 'String', required: true },
  price: { type: 'Number', required: true },
  quantity: { type: 'Number', required: true },
  description: { type: 'String', required: true },
  discount_ratio: { type: 'Number', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  category: { type: 'String', required: true },
  vendor: { type: Schema.Types.ObjectId, ref: 'Vendor' }
});

export default mongoose.model('Item', itemSchema);
