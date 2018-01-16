const mongoose = require('mongoose');
const AdminSchema = require('../schemas/AdminSchema');
const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;