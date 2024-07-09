const { default: mongoose } = require("mongoose");

const kycSchema = new mongoose.Schema({
    fullName: { type: String, required: true},
    nationality: { type: String, required: true},
    address: { type: String, required: true},
    phone: { type: String, required: true},
    gender: { type: String, required: true},
    soi: { type: String, required: true},
    id: { type: String, required: true},
})
  
const Kyc = mongoose.model('Kyc', kycSchema);

module.exports = Kyc