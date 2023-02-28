import express from 'express'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService.js'
import { logger } from './Logger.js'
import { Forbidden } from './Errors.js'



export default class BaseController {
  constructor(mount) {
    if (typeof mount !== 'string') {
      throw new Error('Unable to register controller no mount path specified')
    }
    if (mount[0] !== '/') {
      mount = '/' + mount
    }
    this.mount = mount
    this.router = express.Router({ mergeParams: true })
  }
}

export async function attachUser(req, res, next) {
  try {
    req.userInfo = await Auth0Provider.getUserInfoFromBearerToken(req.headers.authorization)
    next()
  } catch (error) {
    req.userInfo = {}
    next()
  }
}

export async function needTOS(req, res, next) {
  try {
    let account = await accountService.getAccount(req.userInfo)
    if (!account.inviteCode) throw new Forbidden('Invite not yet validated')
    if (!account.TOSAgree) throw new Forbidden('Terms have not yet been accepted')
    next()
  } catch (error) {
    next(error)
  }

}
