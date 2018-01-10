const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const BillSchemas = new Schema({
    code: {type: String, required: true},
    user: {
        type: ObjectId,
        ref: 'user'
    },
    details: [{
        time: {
            type: Date,
            default: Date.now()
        },
        place: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            default: 0.00,
            required: true
        }
    }],
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

BillSchemas.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next();
});

module.exports = BillSchemas;