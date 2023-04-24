import { Schema } from "mongoose";

export const mangoEventSchema = new Schema(
  {
    blockTime: { type: Number, required: true },
    events: { type: [], required: true },
    signature: { type: String, required: true },
  },
  {
    timestamps: false,
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
