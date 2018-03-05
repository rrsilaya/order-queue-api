import { Schema } from 'mongoose';

import db from '../../db';

const orderSchema = new Schema({
  name: {
    type: String,
    required: [ true, 'Missing name' ],
  },

  order: {
    type: String,
    required: [ true, 'Missing order' ]
  },

  isProcessed: {
    type: Boolean,
    default: false
  },
});

const Order = db.model('Order', orderSchema);

export default Order;
