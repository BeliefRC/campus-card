const Instruction = require('../models/Instruction');
const setJson = require('../until/SetJson');

//新增(保存)通知
exports.save = async (req, res) => {
    try {
        let _instruction = req.body;
        let instruction = await Instruction.find();
        if (instruction.length) {
            Object.assign(instruction, _instruction)
        } else {
            instruction = new Instruction(_instruction);
        }
        instruction = new Instruction(instruction);
        instruction = await instruction.save();
        res.json(setJson(true, '新增通知成功', instruction))
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
            res.json(setJson(true, '新增通知成功', instruction))
        } else {
            res.json(setJson(false, '查看公告详情失败', null))
        }
    }
    catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};
