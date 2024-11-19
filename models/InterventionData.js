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
    zone: {
      type: String,
      trim: true,
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
    interventionIssueBrief: {
      type: String,
      trim: true,
    },
    interventionContactFollowUp: {
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

// Pre-save hook to fetch and set zone and boothType from AcData
interventionDataSchema.pre("save", async function (next) {
  try {
    // Fetch data from AcData
    const acData = await AcData.findOne({ booth: this.booth });
    if (acData) {
      if (acData.zone) this.zone = acData.zone; // Set zone
      if (acData.boothType) this.boothType = acData.boothType; // Set boothType
    }

    next();
  } catch (error) {
    next(error);
  }
});

const InterventionData = mongoose.model("interventionData", interventionDataSchema);

module.exports = InterventionData;
