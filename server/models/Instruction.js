const mongoose = require('mongoose');
const InstructionSchema = require('../schemas/InstructionSchema');
const Instruction = mongoose.model('Instruction', InstructionSchema);
module.exports = Instruction;