import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { artistsService } from "./ArtistsService.js"


class ProjectsService {
  async getAll(query = {}) {
    const projects = await dbContext.Projects.find(query).limit(25).skip(query.page)
    return projects
  }
  async getOne(id) {
    const project = await dbContext.Projects.findById(id)
    if (!project) throw new BadRequest('no project at id ' + id)
    return project
  }

  async getRelated(id, artistName) {
    const project = await this.getOne(id)
    const artist = await artistsService.getArtist({ username: artistName })
    const projects = await dbContext.Projects.find({
      $and: [
        { ownerId: artist },
        { tags: { $in: project.tags } },
        { _id: { $ne: id } }
      ]
    })
    return projects
  }
  async create(body) {
    const project = await dbContext.Projects.create(body)
    return project
  }
  async update(body) {
    const original = await this.getOne(body.id)
    if (original.ownerId != body.ownerId) throw new Forbidden(`${original.name} is not yours to edit`)
    original.name = body.name != null ? body.name : original.name
    original.body = body.body != null ? body.body : original.body
    original.coverImg = body.coverImg != null ? body.coverImg : original.coverImg
    original.coverBlur = body.coverBlur != null ? body.coverBlur : original.coverBlur
    original.published = body.published != null ? body.published : original.published
    original.tags = body.tags != null ? body.tags : original.tags
    original.software = body.software != null ? body.software : original.software
    await original.save()
    return original
  }
  async remove(projectId, userId) {
    const original = await this.getOne(projectId)
    if (original.ownerId != userId) throw new Forbidden(`${original.name} is not yours to remove`)
    await original.remove()
    return `${original.name} was deleted`
    // TODO remove Children
  }


}

export const projectsService = new ProjectsService()
