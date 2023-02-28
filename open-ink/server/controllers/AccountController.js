import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController, { needTOS } from '../utils/BaseController'
import { themeService } from '../services/ThemeService.js'
import { invitesService } from '../services/invitesService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/invites', this.getInvites)
      .use(needTOS)
      .put('', this.updateAccount)
      .put('/theme', this.updateTheme)
      .get('/limits', this.getCounts)
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
      const account = await accountService.updateAccount(req.userInfo, req.body)
      return res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async updateTheme(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      let theme = await themeService.update(req.body)
      return res.send(theme)
    } catch (error) {
      next(error)
    }
  }

  async getInvites(req, res, next) {
    try {
      let invites = await invitesService.getAll({ creatorId: req.userInfo.id })
      return res.send(invites)
    } catch (error) {
      next(error)
    }
  }

  async getCounts(req, res, next) {
    try {
      const countObj = await accountService.getCounts(req.userInfo.id)
      return res.send(countObj)
    } catch (error) {
      next(error)
    }
  }
}
