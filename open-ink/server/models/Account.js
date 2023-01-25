import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    username: {
      type: String, required: true, unique: true, lowercase: true, default: function (a) {
        return a.name;
      }
    }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

AccountSchema.virtual('theme', {
  localField: '_id',
  foreignField: 'accountId',
  ref: 'Theme',
  justOne: true
})


