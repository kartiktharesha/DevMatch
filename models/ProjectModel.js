const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  skillsRequired: {
    type: [String],
    default: []
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cost: {
    type: Number,
    default: 0
  },

  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application"
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);