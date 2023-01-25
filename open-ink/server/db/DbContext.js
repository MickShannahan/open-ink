import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { GallerySchema } from '../models/Gallery.js';
import { ProjectSchema } from '../models/Project.js';
import { PieceSchema } from '../models/Piece.js';
import { ContributorSchema } from '../models/Contributor.js';
import { ThemeSchema } from '../models/Theme.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Theme = mongoose.model('Theme', ThemeSchema)
  Galleries = mongoose.model('Gallery', GallerySchema)
  Projects = mongoose.model('Project', ProjectSchema)
  Pieces = mongoose.model('Piece', PieceSchema)
  Contributors = mongoose.model('Contributor', ContributorSchema)
}

export const dbContext = new DbContext()
