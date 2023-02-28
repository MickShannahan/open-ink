import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId
import { dbContext } from "../db/DbContext.js";


export const ProjectSchema = new Schema({
  name: { type: String, required: true, maxlength: 30, minlength: 3 },
  body: { type: String, maxlength: 500 },
  coverImg: { type: String, default: defaultCover },
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

ProjectSchema.post('remove', async ({ _id }) => {
  let pieces = await dbContext.Pieces.find({ projectId: _id })
  pieces.forEach(p => {
    p.remove()
  })
})


function defaultCover() {
  let covers = [
    'https://images.unsplash.com/photo-1664179550989-894a1587554b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=600&q=99',
    'https://images.unsplash.com/photo-1663517769012-ef0422b99924?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=600&q=99',
    'https://images.unsplash.com/photo-1663601398716-3d40cef5d1fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=600&q=99'
  ]
  return covers[Math.floor(Math.random() * covers.length)]
}
