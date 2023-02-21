import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    username: {
      type: String, required: true, unique: true, lowercase: true
    },
    displayName: { type: String, required: true, enum: ['name', 'username'], default: 'name' },
    bio: { type: String, maxlength: 100 },
    location: { type: String, maxlength: 45 },
    nsfw: { type: Boolean, required: true, default: false },
    TOSAgree: { type: Boolean, required: true, default: false },
    inviteCode: { type: Schema.Types.ObjectId, ref: 'Invite' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

AccountSchema.virtual('theme', {
  localField: '_id',
  foreignField: 'accountId',
  ref: 'Theme',
  justOne: true
})


