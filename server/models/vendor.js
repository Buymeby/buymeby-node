import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  name: { type: 'String', required: true },
  hours: { type: 'String', required: true },
  description: { type: 'String', required: true },
  location: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  items: [ { type: Schema.Types.ObjectId, ref: 'Item' } ]
});

export default mongoose.model('Vendor', vendorSchema);
