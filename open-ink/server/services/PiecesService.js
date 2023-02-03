import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { projectsService } from "./ProjectsService.js";
import { artistsService } from './ArtistsService.js'


class PiecesService {
  async getAll(query = {}) {
    const pieces = await dbContext.Pieces.find(query)
    return pieces
  }

  async getOne(id) {
    const piece = await dbContext.Pieces.findById(id)
    if (!piece) throw new BadRequest('no piece by id ' + id)
    return piece
  }
  async create(body) {
    const count = await dbContext.Pieces.count({ projectId: body.projectId })
    body.order = count + 1
    const piece = await dbContext.Pieces.create(body)
    if (count >= 1) {
      await projectsService.update({ id: body.projectId, ownerId: body.ownerId, coverImg: piece.smallUrl, coverBlur: piece.blurHash })
    }
    // TODO if first piece create set coverImg for project
    return piece
  }
  async update(body) {
    const original = await this.getOne(body.id)
    if (original.ownerId != body.ownerId) throw new Forbidden(`not the owner of ${original.fileName}`)

    original.body = body.body != null ? body.body : original.body
    original.order = body.order != null ? body.order : original.order
    await original.save()
    return original

  }
  async remove(pieceId, userId) {
    const original = await this.getOne(pieceId)
    if (original.ownerId != userId) throw new Forbidden(`not the owner of ${original.fileName}`)
    await original.remove()
    return `${original.fileName} was removed`
  }

}

export const piecesService = new PiecesService()
