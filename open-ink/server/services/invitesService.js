import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";




class InvitesService {
  async getAll(query = {}) {
    const invites = await dbContext.Invites.find(query).populate('account creator')
    return invites
  }
  async getOne(inviteId) {
    const invite = await dbContext.Invites.findById(inviteId).populate('account creator')
    return invite
  }
  async create(inviteData) {
    const currentInvites = await dbContext.Invites.count({ creatorId: inviteData.creatorId })
    if (currentInvites >= 3) throw new BadRequest('You have reached the limit of invites allowed')
    const invite = await dbContext.Invites.create(inviteData)
    invite.populate('account')
    return invite
  }
  async accept(inviteData) {
    const original = await dbContext.Invites.findById(inviteData.id)
    original.accepted = inviteData.accepted ? inviteData.accepted : original.accepted
    await original.save()
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
