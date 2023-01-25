import { dbContext } from "../db/DbContext.js"


class ThemeService {
  async update(update = {}) {
    const album = await dbContext.Theme.findOneAndUpdate({ accountId: update.accountId }, update)
    return album
  }

  async create(themeData) {
    const exists = dbContext.Theme.findOne({ accountId: themeData.accountId })
    if (exists) return exists
    const theme = await dbContext.Theme.create(themeData)
    return theme
  }

}

export const themeService = new ThemeService()
