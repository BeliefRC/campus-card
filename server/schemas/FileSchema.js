const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FileSchema = new Schema({

    filename: {
        type: String,
        required: true,
    },
    originalName: {
        type: String,
        required: true,
    },
    downloadNum: {
        type: Number,
        default: 0,
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
FileSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next();
});

module.exports = FileSchema;