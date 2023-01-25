import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController.js'

export class ContributorsController extends BaseController {
  constructor() {
    super('api/:artist/contributors')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.remove)
  }
  create(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
    throw new Error('Method not implemented.')
  }
  update(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
    throw new Error('Method not implemented.')
  }
  remove(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }



}
