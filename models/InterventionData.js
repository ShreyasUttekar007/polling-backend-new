const mongoose = require("mongoose");
const { Schema } = mongoose;
const AcData = require("../models/AcData"); 
const Booth = require("./MappingData");

const interventionDataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    constituency: {
      type: String,
      required: [true, "Please select a Constituency"],
      trim: true,
    },
    booth: {
      type: String,
      required: [true, "Please select a Booth"],
      trim: true,
    },
    boothType: {
      type: String,
      trim: true,
    },
    interventionType: {
      type: String,
      trim: true,
    },
    interventionIssues: {
      type: String,
      trim: true,
    },
    interventionAction: {
      type: String,
      trim: true,
      default: "Not Solved",
    },
  },
  { timestamps: true }
);


const InterventionData = mongoose.model("interventionData", interventionDataSchema);

module.exports = InterventionData;
