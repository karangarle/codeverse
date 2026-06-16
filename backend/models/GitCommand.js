import mongoose from "mongoose";

const gitCommandSchema = new mongoose.Schema(
  {
    command: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    example: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("GitCommand", gitCommandSchema);
