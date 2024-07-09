const { default: mongoose } = require("mongoose");

const supportSchema = new mongoose.Schema({
    subject: { type: String, required: true},
    priority: { type: String, required: true},
    message: { type: String, required: true},
    attachment: { type: String, required: true},
})
  
const Support = mongoose.model('Support', supportSchema);

module.exports = Support