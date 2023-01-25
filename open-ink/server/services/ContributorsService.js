import { dbContext } from "../db/DbContext.js"


class ContributorsService {
  async getAll(query = {}) {
    const contributors = await dbContext.Contributors.find(query)
    return contributors
  }

}

export const contributorsService = new ContributorsService()
