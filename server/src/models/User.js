const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: String,
    adventureInterests: [String],
    experienceLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    hearAboutUs: {
        type: String,
        required: true,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
