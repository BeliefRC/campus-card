const mongoose = require('mongoose');
const NoticeSchema = require('../schemas/NoticeSchema');
const Notice = mongoose.model('Notice', NoticeSchema);
module.exports = Notice;