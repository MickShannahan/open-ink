import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController, { needTOS } from '../utils/BaseController.js'
import { piecesService } from '../services/PiecesService.js'

export class PiecesController extends BaseController {
  constructor() {
    super('api/:artist/pieces')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .use(needTOS)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.remove)
  }
  async getAll(req, res, next) {
    try {
      const pieces = await piecesService.getAll({ ownerId: req.params.artist })
      return res.send(pieces)
    } catch (error) {
      next(error)
    }
  }
  async getOne(req, res, next) {
    try {
      const piece = await piecesService.getOne(req.params.id)
      return res.send(piece)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.ownerId = req.userInfo.id
      const piece = await piecesService.create(req.body)
      return res.send(piece)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      req.body.ownerId = req.userInfo.id
      req.body.id = req.params.id
      const piece = await piecesService.update(req.body)
      return res.send(piece)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      const message = await piecesService.remove(req.params.id, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }


}
