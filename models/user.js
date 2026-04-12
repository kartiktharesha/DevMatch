const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    branch: {
    type: String,
    required: true,
    enum: ["IT", "ICT", "EC", "EE"]
    },
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    skills: {
        type: [String],
        default: []
    },

   linkedin: {
    type: String,
    match: [/^https:\/\/(www\.)?linkedin\.com\/.*/, "Please use valid LinkedIn URL"]
   },

   isAvailable: {
  type: Boolean,
  default: true
}
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);


