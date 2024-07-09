const { default: mongoose } = require("mongoose");
const bcrypt = require('bcryptjs');

const transactionSchema = new mongoose.Schema({
    transactionNumber: { type: String, required: true, unique: true},
    wallet: { type: String, required: true},
    type: { type: String, required: true},
    amount: { type: String, required: true},
    // password: { type: String, required: true},
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction