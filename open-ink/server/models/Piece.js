import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const PieceSchema = new Schema({
  fileName: { type: String, required: true },
  body: { type: String, maxlength: 500 },
  ownerId: { type: ObjectId, required: true, ref: 'Account' },
  projectId: { type: ObjectId, required: true, ref: 'Project' },
  galleryId: { type: ObjectId, required: true, ref: 'Gallery' },
  imgUrl: { type: String, required: true },
  smallUrl: { type: String },
  blurHash: { type: String },
  height: { type: Number },
  width: { type: Number },
  order: { type: Number, required: true, default: 0 }
})
