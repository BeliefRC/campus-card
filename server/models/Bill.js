const mongoose = require('mongoose');
const BillSchema = require('../schemas/BillSchema');
const Bill = mongoose.model('Bill', BillSchema);
module.exports = Bill;