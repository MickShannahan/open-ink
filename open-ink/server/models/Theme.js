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
  background: { type: String, required: true, default: '#222' },
  backgroundType: { type: String, required: true, default: 'fill' },
  backgroundAccent: { type: String, required: true, default: '#e6f332' },
  fontHeading: { type: String, required: true, default: "'Montserrat', sans-serif" },
  fontBody: { type: String, required: true, default: "'Nunito', sans-serif" },
  fontColor: { type: String, required: true, default: '#111' },
  cover: { type: String, default: '#000' },
  coverType: { type: String, default: 'fill', enum: coverTypes },
  layout: { type: String, default: 'squares', enum: layouts },
  card: { type: String, default: 'sharp', enum: cards },
  cardBorder: { type: Number, required: true, default: 0, min: 0, max: 20 },
  shadow: { type: String, required: true, default: '0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)' },
  gap: { type: Number, default: 0, min: 0 },
  gapMeasurement: { type: String, default: 'px', enum: measurements },
  gutter: { type: Number, default: 0, min: 0 },
  columns: { type: Number, default: 300, min: 150, max: 500 },
  gutterMeasurement: { type: String, default: 'px', enum: measurements }
})
