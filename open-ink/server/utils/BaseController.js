import express from 'express'
import { Auth0Provider } from '@bcwdev/auth0provider'

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
