import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class InvitesService {

  async getAccountInvites() {
    const res = await api.get('account/invites')
    AppState.invites = res.data
  }

  async create() {
    const res = await api.post('api/invites')
    logger.log('invite created')
    AppState.invites.push(res.data)
  }

  async checkCode(code) {
    const res = await api.get('api/invites/' + code)
    logger.log(res.data)
    return res.data
  }

  async accept(invite) {
    const res = await api.put(`api/invites/${invite.id}/accept`, invite)
    logger.log('accepted', res.data)
  }

}

export const invitesService = new InvitesService()
