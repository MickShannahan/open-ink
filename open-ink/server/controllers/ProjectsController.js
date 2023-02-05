import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController, { attachUser } from '../utils/BaseController.js'
import { projectsService } from '../services/ProjectsService.js'
import { piecesService } from '../services/PiecesService.js'
import { contributorsService } from '../services/ContributorsService.js'

export class ProjectsController extends BaseController {
  constructor() {
    super('api/:artist/projects')
    this.router
      .use(attachUser)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .get('/:id/pieces', this.getPieces)
      .get('/:id/contributors', this.getContributors)
      .get('/:id/related', this.getRelated)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.remove)
  }
  async getAll(req, res, next) {
    try {
      const projects = await projectsService.getAll({ ownerId: req.params.artist, ...req.query }, req.userInfo)
      return res.send(projects)
    } catch (error) {
      next(error)
    }
  }
  async getOne(req, res, next) {
    try {
      const project = await projectsService.getOne(req.params.id)
      return project
    } catch (error) {
      next(error)
    }
  }

  async getPieces(req, res, next) {
    try {
      const pieces = await piecesService.getAll({ projectId: req.params.id })
      return res.send(pieces)
    } catch (error) {
      next(error)
    }
  }

  async getContributors(req, res, next) {
    try {
      const contributors = await contributorsService.getAll({ projectId: req.params.id })
      return res.send(contributors)
    } catch (error) {
      next(error)
    }
  }

  async getRelated(req, res, next) {
    try {
      const projects = await projectsService.getRelated(req.params.id, req.params.artist)
      return res.send(projects)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.ownerId = req.userInfo.id
      const project = await projectsService.create(req.body)
      return res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.ownerId = req.userInfo.id
      const project = await projectsService.update(req.body)
      return res.send(project)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      const message = await projectsService.remove(req.params.id, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
