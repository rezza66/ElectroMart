import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    kelurahan: {
      type: String,
      required: true,
    },
    kecamatan: {
      type: String,
      required: true,
    },
    kabupaten: {
      type: String,
      required: true,
    },
    provinsi: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true, 
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Address", addressSchema);
