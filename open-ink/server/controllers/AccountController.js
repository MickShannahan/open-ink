import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { themeService } from '../services/ThemeService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.updateAccount)
      .put('/theme', this.updateTheme)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async updateAccount(req, res, next) {
    try {
      const account = await accountService.updateAccount(req.body)
      return res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async updateTheme(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      let theme = await themeService.update(req.body)
    } catch (error) {
      next(error)
    }
  }
}
