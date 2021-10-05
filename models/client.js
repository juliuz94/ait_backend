const mongoose = require('mongoose');
const { model } = mongoose;

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: String,
  city: String,
  category: String,
  userCreated: String,
  isActive: Boolean
}, { timestamps: true })

module.exports = model('Client', clientSchema);