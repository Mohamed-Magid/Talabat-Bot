const mongoose = require('mongoose');
const requestsSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    chatId: {
        type: String,
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    senderUsername:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Boolean,
        default: false
    },
    reported: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});
module.exports = mongoose.model('Requests', requestsSchema);