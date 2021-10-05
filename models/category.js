const mongoose = require('mongoose');
const { model } = mongoose;

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = model('Category', categorySchema);