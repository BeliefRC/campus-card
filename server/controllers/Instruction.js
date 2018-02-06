const Instruction = require('../models/Instruction');
const setJson = require('../until/SetJson');

//新增(保存)通知
exports.save = async (req, res) => {
    try {
        let _instruction = req.body, instruction;
        let instructions = await Instruction.find();
        if (instructions.length) {
            instruction = instructions[0];
            Object.assign(instruction, _instruction)
        } else {
            instruction = new Instruction(_instruction);
        }
        instruction = await instruction.save();
        res.json(setJson(true, '保存使用说明成功', instruction))
    }
    catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};

//公告详情
exports.detail = async (req, res) => {
    try {
        let instruction = await Instruction.findOne();
        if (instruction) {
            res.json(setJson(true, '查看使用说明成功', instruction))
        } else {
            res.json(setJson(false, '查看使用说明失败', null))
        }
    }
    catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};
