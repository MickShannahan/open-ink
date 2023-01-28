import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const GallerySchema = new Schema({
  ownerId: { type: ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true, maxlength: 20, minlength: 3, default: "Gallery" },
  projectCount: { type: Number, required: true, default: 0 },
  order: { type: Number, required: true, default: 0 },
  published: { type: Boolean, required: true, default: false },
  nsfw: { type: Boolean, required: true, default: false }
}, { timestamps: true, toJSON: { virtuals: true } })
