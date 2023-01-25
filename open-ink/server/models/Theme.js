import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

const layouts = ['squares', 'columns', 'bricks']
const coverTypes = ['fill', 'linear', 'image']
const cards = ['sharp', 'label', 'brutal']
const measurements = ['px', '%', 'rm']

export const ThemeSchema = new Schema({
  accountId: { type: ObjectId, required: true, ref: 'Account', unique: true },
  primaryColor: { type: String, default: '#222' },
  secondaryColor: { type: String, default: '#fce303' },
  accentColor: { type: String, default: '#fff27a' },
  cover: { type: String, default: '#000' },
  coverType: { type: String, default: 'fill', enum: coverTypes },
  layout: { type: String, default: 'squares', enum: layouts },
  card: { type: String, default: 'sharp', enum: cards },
  gap: { type: Number, default: 0, min: 0 },
  gapMeasurement: { type: String, default: 'px', enum: measurements },
  gutter: { type: Number, default: 0, min: 0 },
  gutterMeasurement: { type: String, default: 'px', enum: measurements }
})
