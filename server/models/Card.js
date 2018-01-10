const mongoose = require('mongoose');
const CardSchema = require('../schemas/CardSchema');
const Card = mongoose.model('Card', CardSchema);
module.exports = Card;