import { Schema } from "mongoose"
const ObjectId = Schema.Types.ObjectId


export const InviteSchema = new Schema(
  {
    accountId: { type: ObjectId, ref: 'Account' },
    creatorId: { type: ObjectId, required: true, ref: 'Account' },
    accepted: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } })

InviteSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

InviteSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
