const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },

    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },

    attemptCount: {
        type: Number,
        default: 1
    }

}, { timestamps: true });


appSchema.index({ project: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.models.Application || mongoose.model("Application", appSchema);