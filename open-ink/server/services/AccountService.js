import { dbContext } from '../db/DbContext'
import { themeService } from './ThemeService.js'

// Private Methods

/**
 * Creates account if one does not exist
 * @param {any} account
 * @param {any} user
 */
async function createAccountIfNeeded(account, user) {
  if (!account) {
    user._id = user.id
    account = await dbContext.Account.create({
      ...user,
      subs: [user.sub]
    })
  }
  const theme = await themeService.create({ accountId: account.id })
  account.theme = theme
  return account
}

/**
 * Creates account if one does not exist
 * @param {any} account
 * @param {any} user
 * @returns {Promise<any>} theme
 */
async function createThemeIfNeeded(account, user) {
  if (account.theme == null) {
    const theme = await themeService.create({ accountId: user.id })
    return theme
  }
  return account.theme
}

/**
 * Adds sub to account if not already on account
 * @param {any} account
 * @param {any} user
 */
async function mergeSubsIfNeeded(account, user) {
  account.subs = account.subs ? account.subs : []
  if (!account.subs.includes(user.sub)) {
    // @ts-ignore
    account.subs.push(user.sub)
    await account.save()
  }
}
/**
 * Restricts changes to the body of the account object
 * @param {any} body
 */
function sanitizeBody(body) {
  const writable = {
    name: body.name,
    username: body.username,
    displayName: body.displayName,
    picture: body.picture,
    bio: body.bio,
    location: body.location
  }
  return writable
}

class AccountService {
  /**
   * Returns a user account from the Auth0 user object
   *
   * Creates user if none exists
   *
   * Adds sub of Auth0 account to account if not currently on account
   * @param {any} user
   */
  async getAccount(user) {
    let account = await dbContext.Account.findOne({
      _id: user.id
    }).populate('theme')
    account = await createAccountIfNeeded(account, user)
    account.theme = await createThemeIfNeeded(account, user)
    await mergeSubsIfNeeded(account, user)
    return account
  }

  /**
   * Updates account with the request body, will only allow changes to editable fields
   *  @param {any} user Auth0 user object
   *  @param {any} body Updates to apply to user object
   */
  async updateAccount(user, body) {
    const update = sanitizeBody(body)
    const account = await dbContext.Account.findOneAndUpdate(
      { _id: user.id },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    return account
  }

  async acceptInvite(accountId, inviteCode) {
    let account = await dbContext.Account.findById(accountId)
    account.TOSAgree = true
    account.inviteCode = inviteCode
    await account.save()
  }

  async getCounts(accountId) {
    let invites = await dbContext.Invites.count({ creatorId: accountId })
    let galleries = await dbContext.Galleries.count({ ownerId: accountId })
    let projects = await dbContext.Projects.count({ ownerId: accountId })
    let pieces = await dbContext.Pieces.count({ ownerId: accountId })
    return { invites, galleries, projects, pieces }
  }
}
export const accountService = new AccountService()
