const mongoose = require('mongoose');

const eventRegistrationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    attendeeType: {
        type: String,
        enum: ['user', 'partner', 'investor', 'media'],
        required: true,
    },
    dietaryRestrictions: String,
    confirmed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('EventRegistration', eventRegistrationSchema);
