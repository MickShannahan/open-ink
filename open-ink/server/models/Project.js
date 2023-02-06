import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const ProjectSchema = new Schema({
  name: { type: String, required: true, maxlength: 30, minlength: 3 },
  body: { type: String, maxlength: 500 },
  coverImg: { type: String },
  coverBlur: { type: String },
  medium: { type: String, maxlength: 25 },
  ownerId: { type: ObjectId, required: true, ref: 'Account' },
  galleryId: { type: ObjectId, required: true, ref: 'Gallery' },
  published: { type: Boolean, required: true, default: false },
  nsfw: { type: Boolean, required: true, default: false },
  tags: [{ type: String }],
  software: [{ type: String }],
  order: { type: Number, required: true, default: 0 }
}, { timestamps: true, toJSON: { virtuals: true } })

ProjectSchema.virtual('pieceCount', {
  localField: '_id',
  foreignField: 'projectId',
  count: true
})
