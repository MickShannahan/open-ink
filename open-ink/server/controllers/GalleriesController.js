import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController, { attachUser, needTOS } from '../utils/BaseController.js'
import { galleriesService } from '../services/GalleriesService.js'
import { projectsService } from '../services/ProjectsService.js'
import { artistsService } from '../services/ArtistsService.js'

export class GalleriesController extends BaseController {
  constructor() {
    super('api/:artist/galleries')
    this.router
      .use(attachUser)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .get('/:id/projects', this.getProjects)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .use(needTOS)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.remove)
  }
  async getAll(req, res, next) {
    try {
      const artist = await artistsService.getArtist({ username: req.params.artists })
      const galleries = await galleriesService.getAll({ ownerId: artist.id, ...req.query }, req.userInfo)
      return res.sent(galleries)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const gallery = await galleriesService.getOne(req.params.id)
      return res.send(gallery)
    } catch (error) {
      next(error)
    }
  }

  async getProjects(req, res, next) {
    try {
      const projects = await projectsService.getAll({ galleryId: req.params.id }, req.userInfo)
      return res.send(projects)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.ownerId = req.userInfo.id
      const gallery = await galleriesService.create(req.body)
      return res.send(gallery)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.ownerId = req.userInfo.id
      const gallery = await galleriesService.update(req.body)
      return res.send(gallery)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      const message = await galleriesService.remove(req.params.id, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

}
