import { Schema } from "mongoose";
import { logger } from "../utils/Logger.js";
import { blobService } from '../services/BlobService.js'
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
}, { timestamps: true, toJSON: { virtuals: true } })


PieceSchema.post('remove', async ({ ownerId, _id, imgUrl, smallUrl, fileName }) => {
  try {
    let base = 'open-ink/'
    let big = imgUrl.slice(imgUrl.indexOf(base) + base.length)
    let small = smallUrl.slice(smallUrl.indexOf(base) + base.length)
    logger.log('Deleting', fileName, big, small)
    let bigRes = await blobService.delete(big)
    logger.log(bigRes)
    let smallRes = await blobService.delete(small)
    logger.log(smallRes)
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
})
