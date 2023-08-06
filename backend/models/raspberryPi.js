const mongoose = require("mongoose");

const raspberryPiSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  publicIP: {
    type: String,
    required: true,
    unique: true,
  },
  privateIPs: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

const RaspberryPi = mongoose.model("RaspberryPi", raspberryPiSchema);

module.exports = { RaspberryPi };
