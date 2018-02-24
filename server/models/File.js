const mongoose = require('mongoose');
const FileSchema = require('../schemas/FileSchema');
const File = mongoose.model('File', FileSchema);
module.exports = File;