const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const CardSchema = new Schema({
    cardholder: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    sex: String,
    photo: String,
    type: {
        type: String,
        enum: ['临时卡', '学生卡', '教师卡']
    },
    isFrozen: {
        type: Boolean,
        default: false
    },
    isLost: {
        type: Boolean,
        default: false
    },
    bill: {
        type: ObjectId,
        ref: 'bill'
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

CardSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next();
});

module.exports = CardSchema;