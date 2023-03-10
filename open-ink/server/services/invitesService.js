import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { accountService } from "./AccountService.js";
import { checkAgainstMax } from "./ServiceUtilities.js";




class InvitesService {
  async getAll(query = {}) {
    const invites = await dbContext.Invites.find(query).populate('account creator')
    return invites
  }
  async getOne(inviteId) {
    const invite = await dbContext.Invites.findById(inviteId).populate('account creator')
    return invite
  }
  async create(inviteData, userInfo) {
    if (!userInfo.roles.includes('admin')) await checkAgainstMax('Invites', { creatorId: inviteData.creatorId }, 3)

    const invite = await dbContext.Invites.create(inviteData)
    invite.populate('account')
    return invite
  }
  async accept(inviteData) {
    const original = await dbContext.Invites.findById(inviteData.id).populate('account creator')
    if (original.account) {
      throw new BadRequest('invite already taken')
    }
    original.accountId = inviteData.accountId
    original.accepted = true
    await original.save()
    await accountService.acceptInvite(inviteData.accountId, inviteData.id)
    return original
  }

  async revoke(inviteId, userId) {
    const original = await this.getOne(inviteId)
    if (original.creatorId != userId) throw new Forbidden('Not your Invite to revoke')
    original.remove()
    // @ts-ignore
    return (`Invite ${original.id} was revoked`)
  }

}

export const invitesService = new InvitesService()
