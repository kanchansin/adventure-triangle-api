const mongoose = require('mongoose');

const apiLogSchema = new mongoose.Schema({
    endpoint: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    statusCode: {
        type: Number,
        required: true,
    },
    responseTime: {
        type: Number,
        required: true,
    },
    ipAddress: String,
    userAgent: String,
    errorMessage: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('ApiLog', apiLogSchema);
