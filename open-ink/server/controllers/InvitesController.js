import { invitesService } from "../services/invitesService.js";
import BaseController, { needTOS } from "../utils/BaseController.js";
import { Auth0Provider } from '@bcwdev/auth0provider'



export class InvitesController extends BaseController {
  constructor() {
    super('api/invites')
    this.router
      .get('/:id', this.getOne)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put('/:id/accept', this.accept)
      .use(needTOS)
      .post('', this.create)
      .delete('/:id/revoke', this.revoke)
  }

  async getOne(req, res, next) {
    try {
      const invite = await invitesService.getOne(req.params.id)
      return res.send(invite)
    } catch (error) {
      next(error)
    }
  }

  // STUB need auth
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const invite = await invitesService.create(req.body, req.userInfo)
      return res.send(invite)
    } catch (error) {
      next(error)
    }
  }

  async accept(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.accountId = req.userInfo.id
      const invite = await invitesService.accept(req.body)
      return res.send(invite)
    } catch (error) {
      next(error)
    }
  }

  async revoke(req, res, next) {
    try {
      const message = await invitesService.revoke(req.params.id, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
