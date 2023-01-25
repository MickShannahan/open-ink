import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

const contributions = [
  'Contributor',
  'Commissioner',
  'Painter',
  'Designer',
  'Concept artist',
  'Sketch artist',
  'Line work artist',
  'Sculptor',
  'Modeler',
  'Rigger',
  'Texture Artist',
  'Printer',
  'OC owner'
]

export const ContributorSchema = new Schema({
  name: { type: String, required: true, maxlength: 25 },
  link: { type: String },
  contribution: { type: String, required: true, default: 'Contributor' },
  projectId: { type: ObjectId, required: true, ref: 'Project' }
})
