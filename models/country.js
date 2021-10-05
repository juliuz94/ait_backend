const mongoose = require('mongoose');
const { model } = mongoose;

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  shortName: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = model('Country', countrySchema);