const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin:{
      type:Boolean,
      default:true
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
AdminSchema.pre('save', function (next) {
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

//匹配密码
AdminSchema.methods = {
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
module.exports = AdminSchema;