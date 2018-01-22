const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const SALT_WORK_FACTOR = 10;
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
    sex: {
        type: String,
        enum: ['男', '女'],
        default: '男'

    },
    type: {
        type: String,
        enum: ['临时卡', '学生卡', '教师卡']
    },
    photo: String,
    balance: {
        type: Number,
        default: 80.00
    },
    isFrozen: {
        type: Boolean,
        default: false
    },
    isLost: {
        type: Boolean,
        default: false
    },
    isAdmin: {
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

//新增用户
CardSchema.pre('save', function (next) {
    let user = this;
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err)
        } else {
            //密码加盐
            bcrypt.hash(user.password, salt, null, (err, hash) => {
                if (err) {
                    return next(err)
                } else {
                    user.password = hash;
                    next()
                }
            })
        }
    })
});

//更新卡
CardSchema.pre('findOneAndUpdate', function (next) {
    console.log(this._update);
    this._update.meta = {updateAt: Date.now()};
    // this.meta.updateAt = Date.now()
    next()
});

//匹配密码
CardSchema.methods = {
    comparePassword(_password, cb) {
        bcrypt.compare(_password, this.password, (err, isMatch) => {
            if (err) {
                console.log(err);
                return cb(err)
            } else {
                cb(null, isMatch)
            }
        })
    }
};

module.exports = CardSchema;