const mongoose = require('mongoose');
const { model } = mongoose;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  clientData: {
    type: {}
  }
}, { timestamps: true })

module.exports = model('User', userSchema);