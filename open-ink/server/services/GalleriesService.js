import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from '../utils/Errors.js'


class GalleriesService {
  async getAll(query = {}) {
    const galleries = await dbContext.Galleries.find(query)
    return galleries
  }
  async getOne(id) {
    const gallery = await dbContext.Galleries.findById(id)
    if (!gallery) throw new BadRequest('no gallery at id ' + id)
    return gallery
  }
  async create(body) {
    const gallery = await dbContext.Galleries.create(body)
    return gallery
  }
  async update(body) {
    const original = await this.getOne(body.id)
    if (original.ownerId != body.ownerId) throw new Forbidden(`${original.name} is not yours to edit.`)
    original.name = body.name != null ? body.name : original.name
    original.order = body.order != null ? body.name : original.order
    await original.save()
    return original
  }
  async remove(galleryId, userId) {
    const original = await this.getOne(galleryId)
    if (original.ownerId != userId) throw new Forbidden(`${original.name} is not yours to edit.`)
    await original.remove()
    return `${original.name} has been deleted`
    // TODO delete Children
  }

}

export const galleriesService = new GalleriesService()
