const { model, Schema } = require('mongoose')

const Transaction = new Schema({
  label: String,
  amount: Number,
  type: String
})

module.exports = model('Transaction', Transaction)
