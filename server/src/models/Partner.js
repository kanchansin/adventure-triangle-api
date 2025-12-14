const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    contactPerson: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    businessType: {
        type: String,
        enum: ['tour_operator', 'equipment_rental', 'accommodation', 'training_center', 'other'],
        required: true,
    },
    adventureTypes: [String],
    location: {
        type: String,
        required: true,
    },
    website: String,
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Partner', partnerSchema);
